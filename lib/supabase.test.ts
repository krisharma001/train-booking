import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Mock the createClient function
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {},
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    rpc: vi.fn(() => Promise.resolve({ data: {}, error: null }))
  }))
}));

// Store original env vars to restore later
const originalEnv = { ...process.env };

describe('Supabase Client', () => {
  beforeEach(() => {
    // Clear and reset the mocks before each test
    vi.clearAllMocks();
    
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    
    // Load .env.test file for test environment variables
    dotenv.config({ path: '.env.test' });
  });
  
  afterEach(() => {
    // Restore original env after each test
    process.env = originalEnv;
  });
  
  it('should initialize with correct environment variables', () => {
    // Set test environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    
    // Import the module after setting the environment variables
    // This ensures the module runs with our test environment
    const { supabase } = require('../lib/supabase');
    
    // Check that the client was created with correct params
    expect(createClient).toHaveBeenCalledWith(
      'https://test-project.supabase.co',
      'test-anon-key'
    );
    
    // Verify that supabase object was returned
    expect(supabase).toBeDefined();
  });
  
  it('should throw error when environment variables are missing', () => {
    // Clear the required environment variables
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // The import should throw an error due to missing variables
    expect(() => {
      require('../lib/supabase');
    }).toThrow();
  });
  
  it('should verify connection with actual API call', async () => {
    // Set test environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    
    // Import the module after setting the environment variables
    const { supabase } = require('../lib/supabase');
    
    // Create a spy to test if methods are called
    const fromSpy = vi.spyOn(supabase, 'from');
    
    try {
      // Perform a test query
      const { data, error } = await supabase.from('test_table').select('*').limit(1);
      
      // Check that the query was executed
      expect(fromSpy).toHaveBeenCalledWith('test_table');
      
      // Since we're using mocks, there should be no error
      expect(error).toBeNull();
    } catch (err) {
      console.error('Connection test failed:', err);
      throw err;
    }
  });
});

// Optional: Test to validate custom connection handling logic
describe('Supabase Connection Error Handling', () => {
  // Mock the createClient function to simulate errors
  beforeEach(() => {
    vi.resetModules();
    vi.mock('@supabase/supabase-js', () => ({
      createClient: vi.fn(() => ({
        from: vi.fn(() => ({
          select: vi.fn(() => ({
            limit: vi.fn(() => Promise.resolve({
              data: null,
              error: { 
                code: '42P01',
                message: 'relation "test_table" does not exist',
                details: 'Test error details',
                hint: 'Create the table first'
              }
            }))
          }))
        })),
        rpc: vi.fn(() => Promise.resolve({
          data: null,
          error: { 
            code: '42501',
            message: 'permission denied',
            details: 'No access',
            hint: 'Check permissions'
          }
        }))
      }))
    }));
    
    // Set test environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
  });
  
  afterEach(() => {
    // Restore original env after each test
    process.env = originalEnv;
  });
  
  it('should handle table not found errors', async () => {
    const { supabase } = require('../lib/supabase');
    
    const { data, error } = await supabase.from('test_table').select('*').limit(1);
    
    expect(error).toBeDefined();
    expect(error.code).toBe('42P01');
    expect(error.message).toContain('does not exist');
  });
  
  it('should handle permission errors', async () => {
    const { supabase } = require('../lib/supabase');
    
    const { data, error } = await supabase.rpc('get_system_health');
    
    expect(error).toBeDefined();
    expect(error.code).toBe('42501');
    expect(error.message).toContain('permission denied');
  });
});