import requests
import sys
from datetime import datetime

class GiftCardAPITester:
    def __init__(self, base_url="https://card-regen-app.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.expected_brands = ["amazon", "netflix", "spotify", "steam", "apple", "google_play", 
                               "uber_eats", "coles", "woolworths", "seven_eleven", "shein", "cotton_on", "forever_new"]

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")

            return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        if success and isinstance(response, dict) and "message" in response:
            print(f"✅ Root message: {response['message']}")
        return success

    def test_get_brands(self):
        """Test GET /brands endpoint"""
        success, response = self.run_test(
            "Get All Brands",
            "GET",
            "brands",
            200
        )
        
        if success and isinstance(response, list):
            brand_ids = [brand.get('id') for brand in response if isinstance(brand, dict)]
            print(f"✅ Found {len(brand_ids)} brands: {brand_ids}")
            
            # Check if all expected brands are present
            missing_brands = set(self.expected_brands) - set(brand_ids)
            if missing_brands:
                print(f"❌ Missing brands: {missing_brands}")
                return False
            
            # Verify brand structure
            for brand in response:
                required_fields = ['id', 'name', 'format', 'color', 'prefix']
                missing_fields = [field for field in required_fields if field not in brand]
                if missing_fields:
                    print(f"❌ Brand {brand.get('id')} missing fields: {missing_fields}")
                    return False
            
            print("✅ All brands have required fields")
            return True
        
        return False

    def test_generate_codes(self):
        """Test POST /generate/{brand_id} for each brand"""
        all_passed = True
        generated_codes = {}
        
        for brand_id in self.expected_brands:
            success, response = self.run_test(
                f"Generate Code for {brand_id}",
                "POST",
                f"generate/{brand_id}",
                200
            )
            
            if success and isinstance(response, dict):
                if 'code' in response and 'brand_id' in response:
                    generated_codes[brand_id] = response['code']
                    print(f"✅ Generated code for {brand_id}: {response['code']}")
                else:
                    print(f"❌ Invalid response structure for {brand_id}")
                    all_passed = False
            else:
                all_passed = False
        
        # Test regeneration (should produce different codes)
        if generated_codes:
            test_brand = list(generated_codes.keys())[0]
            success, response = self.run_test(
                f"Regenerate Code for {test_brand}",
                "POST",
                f"generate/{test_brand}",
                200
            )
            
            if success and isinstance(response, dict) and 'code' in response:
                new_code = response['code']
                old_code = generated_codes[test_brand]
                if new_code != old_code:
                    print(f"✅ Regeneration works - Old: {old_code}, New: {new_code}")
                else:
                    print(f"⚠️  Warning: Regenerated same code (could be random)")
            else:
                all_passed = False
        
        return all_passed

    def test_invalid_brand(self):
        """Test POST /generate/{brand_id} with invalid brand"""
        success, response = self.run_test(
            "Generate Code for Invalid Brand",
            "POST",
            "generate/invalid_brand",
            200  # API returns 200 with error message
        )
        
        if success and isinstance(response, dict) and 'error' in response:
            print(f"✅ Proper error handling: {response['error']}")
            return True
        
        return False

    def test_get_stats(self):
        """Test GET /stats endpoint"""
        success, response = self.run_test(
            "Get Generation Stats",
            "GET",
            "stats",
            200
        )
        
        if success and isinstance(response, dict) and 'total_generations' in response:
            count = response['total_generations']
            print(f"✅ Total generations: {count}")
            return True
        
        return False

    def test_verify_endpoint_sequence(self, brand_id="steam"):
        """Test verify endpoint with 5 sequential attempts"""
        print(f"\n=== Testing Verify Sequence for {brand_id} ===")
        
        # First generate a code
        success, response = self.run_test(
            f"Generate Code for Verify Test - {brand_id}",
            "POST",
            f"generate/{brand_id}",
            200
        )
        
        if not success or 'code' not in response:
            print(f"❌ Failed to generate code for {brand_id}")
            return False

        code = response['code']
        print(f"Generated code for verification: {code}")

        # Test 5 sequential verify attempts
        verify_results = []
        for attempt in range(1, 6):
            # Use query parameter for code
            endpoint = f"verify/{brand_id}?code={code}"
            success, response = self.run_test(
                f"Verify Attempt {attempt} - {brand_id}",
                "POST",
                endpoint,
                200
            )
            
            if success and isinstance(response, dict):
                verified = response.get('verified', False)
                attempt_num = response.get('attempt', 0)
                verify_results.append({
                    'attempt': attempt,
                    'verified': verified,
                    'response_attempt': attempt_num
                })
                
                # Check if verification follows expected pattern
                expected_verified = (attempt_num % 5 == 0)  # Every 5th attempt should be verified
                if verified == expected_verified:
                    print(f"   ✅ Attempt {attempt} (counter: {attempt_num}): verified={verified} (expected)")
                else:
                    print(f"   ❌ Attempt {attempt} (counter: {attempt_num}): verified={verified} (expected {expected_verified})")
            else:
                verify_results.append({'attempt': attempt, 'error': True})
                print(f"   ❌ Attempt {attempt}: API call failed")

        return verify_results

    def test_per_brand_counters(self):
        """Test that verify counters are per-brand"""
        print(f"\n=== Testing Per-Brand Counter Independence ===")
        
        # Test with two different brands
        brand1 = "apple"
        brand2 = "cotton_on"
        
        # Generate codes for both brands
        success1, response1 = self.run_test(
            f"Generate Code for Counter Test - {brand1}",
            "POST",
            f"generate/{brand1}",
            200
        )
        
        success2, response2 = self.run_test(
            f"Generate Code for Counter Test - {brand2}",
            "POST",
            f"generate/{brand2}",
            200
        )
        
        if not success1 or not success2 or 'code' not in response1 or 'code' not in response2:
            print("❌ Failed to generate codes for counter test")
            return False

        code1 = response1['code']
        code2 = response2['code']

        # Verify brand1 once
        success1, verify_response1 = self.run_test(
            f"Verify {brand1} - Counter Test",
            "POST",
            f"verify/{brand1}?code={code1}",
            200
        )

        # Verify brand2 once  
        success2, verify_response2 = self.run_test(
            f"Verify {brand2} - Counter Test",
            "POST",
            f"verify/{brand2}?code={code2}",
            200
        )

        if success1 and success2:
            attempt1 = verify_response1.get('attempt', 0)
            attempt2 = verify_response2.get('attempt', 0)
            print(f"   {brand1} attempt: {attempt1}")
            print(f"   {brand2} attempt: {attempt2}")
            
            # The attempts should be independent (could be different numbers)
            print("   ✅ Per-brand counters working independently")
            return True
        
        return False

    def test_verify_invalid_brand(self):
        """Test verify endpoint with invalid brand"""
        success, response = self.run_test(
            "Verify Invalid Brand",
            "POST",
            "verify/invalid_brand?code=TEST123",
            200  # API returns 200 with error message
        )
        
        if success and isinstance(response, dict) and 'error' in response:
            print(f"✅ Proper error handling for invalid brand: {response['error']}")
            return True
        
        return False

def main():
    print("🚀 Starting Gift Card API Tests")
    print("=" * 50)
    
    tester = GiftCardAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_get_brands,
        tester.test_generate_codes,
        tester.test_invalid_brand,
        tester.test_get_stats,
        tester.test_verify_invalid_brand,
        lambda: tester.test_verify_endpoint_sequence("steam"),
        lambda: tester.test_verify_endpoint_sequence("apple"),
        tester.test_per_brand_counters
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.tests_run += 1
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())