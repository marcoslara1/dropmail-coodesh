export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Updates = {
  balance: number | undefined;
  currency: string | undefined;
  previous_atributes: {
    balance: number | undefined;
  };
};

export interface Database {
  public: {
    Tables: {
      alumini: {
        Row: {
          created_at: string;
          id: number;
          school_id: number | null;
          technician_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          school_id?: number | null;
          technician_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          school_id?: number | null;
          technician_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'alumini_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'alumini_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'alumini_technician_id_fkey';
            columns: ['technician_id'];
            referencedRelation: 'techinicians';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'alumini_technician_id_fkey';
            columns: ['technician_id'];
            referencedRelation: 'decrypted_techinicians';
            referencedColumns: ['id'];
          }
        ];
      };
      apiKeys: {
        Row: {
          created_at: string;
          id: number;
          key: string | null;
          profile_id: number | null;
          revoked: boolean | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          key?: string | null;
          profile_id?: number | null;
          revoked?: boolean | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          key?: string | null;
          profile_id?: number | null;
          revoked?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'apiKeys_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'apiKeys_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
      billing: {
        Row: {
          created_at: string;
          currency: string | null;
          customer_id: string | null;
          date: unknown | null;
          end: string | null;
          help_status: Database['public']['Enums']['billing_help'] | null;
          id: number;
          intent: string | null;
          profile_id: number | null;
          start: string | null;
          status: Database['public']['Enums']['billing_status'] | null;
          total: number | null;
          type: Database['public']['Enums']['type'] | null;
        };
        Insert: {
          created_at?: string;
          currency?: string | null;
          customer_id?: string | null;
          date?: unknown | null;
          end?: string | null;
          help_status?: Database['public']['Enums']['billing_help'] | null;
          id?: number;
          intent?: string | null;
          profile_id?: number | null;
          start?: string | null;
          status?: Database['public']['Enums']['billing_status'] | null;
          total?: number | null;
          type?: Database['public']['Enums']['type'] | null;
        };
        Update: {
          created_at?: string;
          currency?: string | null;
          customer_id?: string | null;
          date?: unknown | null;
          end?: string | null;
          help_status?: Database['public']['Enums']['billing_help'] | null;
          id?: number;
          intent?: string | null;
          profile_id?: number | null;
          start?: string | null;
          status?: Database['public']['Enums']['billing_status'] | null;
          total?: number | null;
          type?: Database['public']['Enums']['type'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'billing_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'billing_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
      billinglogs: {
        Row: {
          created_at: string;
          error: Json | null;
          id: number;
          status: string | null;
        };
        Insert: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Update: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          course: string | null;
          created_at: string;
          id: number;
          private: boolean | null;
          school_id: number | null;
        };
        Insert: {
          course?: string | null;
          created_at?: string;
          id?: number;
          private?: boolean | null;
          school_id?: number | null;
        };
        Update: {
          course?: string | null;
          created_at?: string;
          id?: number;
          private?: boolean | null;
          school_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'courses_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'courses_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
      emaillogs: {
        Row: {
          created_at: string;
          error: Json | null;
          id: number;
          status: string | null;
        };
        Insert: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Update: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Relationships: [];
      };
      internships: {
        Row: {
          created_at: string;
          id: number;
          techinitian_id: number | null;
          text: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          techinitian_id?: number | null;
          text?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          techinitian_id?: number | null;
          text?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'internships_techinitian_id_fkey';
            columns: ['techinitian_id'];
            referencedRelation: 'techinicians';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'internships_techinitian_id_fkey';
            columns: ['techinitian_id'];
            referencedRelation: 'decrypted_techinicians';
            referencedColumns: ['id'];
          }
        ];
      };
      logs: {
        Row: {
          created_at: string;
          error: Json | null;
          id: number;
          operation: string | null;
          status: string | null;
        };
        Insert: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          operation?: string | null;
          status?: string | null;
        };
        Update: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          operation?: string | null;
          status?: string | null;
        };
        Relationships: [];
      };
      openailogs: {
        Row: {
          created_at: string;
          error: Json | null;
          id: number;
          status: string | null;
        };
        Insert: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Update: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          businessname: string | null;
          created_at: string | null;
          inactive: boolean | null;
          profile_id: number;
          token: string | null;
          token_ttl: string | null;
          type: Database['public']['Enums']['type'] | null;
          updated_at: string | null;
          user_id: string;
          verificationrequested: boolean | null;
          verified: boolean | null;
        };
        Insert: {
          businessname?: string | null;
          created_at?: string | null;
          inactive?: boolean | null;
          profile_id?: number;
          token?: string | null;
          token_ttl?: string | null;
          type?: Database['public']['Enums']['type'] | null;
          updated_at?: string | null;
          user_id: string;
          verificationrequested?: boolean | null;
          verified?: boolean | null;
        };
        Update: {
          businessname?: string | null;
          created_at?: string | null;
          inactive?: boolean | null;
          profile_id?: number;
          token?: string | null;
          token_ttl?: string | null;
          type?: Database['public']['Enums']['type'] | null;
          updated_at?: string | null;
          user_id?: string;
          verificationrequested?: boolean | null;
          verified?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      requests: {
        Row: {
          billing_id: number | null;
          created_at: string;
          id: number;
          profile_id: number | null;
          requesttype: Database['public']['Enums']['request_types'] | null;
        };
        Insert: {
          billing_id?: number | null;
          created_at?: string;
          id?: number;
          profile_id?: number | null;
          requesttype?: Database['public']['Enums']['request_types'] | null;
        };
        Update: {
          billing_id?: number | null;
          created_at?: string;
          id?: number;
          profile_id?: number | null;
          requesttype?: Database['public']['Enums']['request_types'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'requests_billing_id_fkey';
            columns: ['billing_id'];
            referencedRelation: 'billing';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'requests_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'requests_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
      stripeBalanceTransactions: {
        Row: {
          billing_id: number;
          created_at: string;
          id: number;
          profile_id: number | null;
          stripeCustomer_id: number | null;
          transaction: Json | null;
        };
        Insert: {
          billing_id: number;
          created_at?: string;
          id?: number;
          profile_id?: number | null;
          stripeCustomer_id?: number | null;
          transaction?: Json | null;
        };
        Update: {
          billing_id?: number;
          created_at?: string;
          id?: number;
          profile_id?: number | null;
          stripeCustomer_id?: number | null;
          transaction?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'stripeBalanceTransactions_billing_id_fkey';
            columns: ['billing_id'];
            referencedRelation: 'billing';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'stripeBalanceTransactions_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'stripeBalanceTransactions_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'stripeBalanceTransactions_stripeCustomer_id_fkey';
            columns: ['stripeCustomer_id'];
            referencedRelation: 'stripeCustomers';
            referencedColumns: ['id'];
          }
        ];
      };
      stripeCustomers: {
        Row: {
          created_at: string;
          customer_id: string | null;
          id: number;
          profile_id: number | null;
        };
        Insert: {
          created_at?: string;
          customer_id?: string | null;
          id?: number;
          profile_id?: number | null;
        };
        Update: {
          created_at?: string;
          customer_id?: string | null;
          id?: number;
          profile_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'stripeCustomers_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'stripeCustomers_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
      stripeCustomersUpdates: {
        Row: {
          billing_id: number;
          created_at: string;
          id: number;
          profile_id: number | null;
          stripeCustomer_id: number | null;
          updates: Updates | null;
        };
        Insert: {
          billing_id: number;
          created_at?: string;
          id?: number;
          profile_id?: number | null;
          stripeCustomer_id?: number | null;
          updates?: Updates | null;
        };
        Update: {
          billing_id?: number;
          created_at?: string;
          id?: number;
          profile_id?: number | null;
          stripeCustomer_id?: number | null;
          updates?: Updates | null;
        };
        Relationships: [
          {
            foreignKeyName: 'stripecustomersupdates_billing_id_fkey';
            columns: ['billing_id'];
            referencedRelation: 'billing';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'stripecustomersupdates_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'stripecustomersupdates_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'stripecustomersupdates_stripecustomer_id_fkey';
            columns: ['stripeCustomer_id'];
            referencedRelation: 'stripeCustomers';
            referencedColumns: ['id'];
          }
        ];
      };
      techinicians: {
        Row: {
          age: number | null;
          city: string | null;
          course: string | null;
          created_at: string;
          email: string | null;
          graduated: boolean | null;
          id: number;
          internships: Json[] | null;
          name: string | null;
          phone: string | null;
          school: string | null;
          school_id: number | null;
        };
        Insert: {
          age?: number | null;
          city?: string | null;
          course?: string | null;
          created_at?: string;
          email?: string | null;
          graduated?: boolean | null;
          id?: number;
          internships?: Json[] | null;
          name?: string | null;
          phone?: string | null;
          school?: string | null;
          school_id?: number | null;
        };
        Update: {
          age?: number | null;
          city?: string | null;
          course?: string | null;
          created_at?: string;
          email?: string | null;
          graduated?: boolean | null;
          id?: number;
          internships?: Json[] | null;
          name?: string | null;
          phone?: string | null;
          school?: string | null;
          school_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'techinicians_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'techinicians_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
      tokenapikeylogs: {
        Row: {
          created_at: string;
          error: Json | null;
          id: number;
          status: string | null;
        };
        Insert: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Update: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          status?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      decrypted_apiKeys: {
        Row: {
          created_at: string | null;
          decrypted_key: string | null;
          id: number | null;
          key: string | null;
          profile_id: number | null;
          revoked: boolean | null;
        };
        Insert: {
          created_at?: string | null;
          decrypted_key?: never;
          id?: number | null;
          key?: string | null;
          profile_id?: number | null;
          revoked?: boolean | null;
        };
        Update: {
          created_at?: string | null;
          decrypted_key?: never;
          id?: number | null;
          key?: string | null;
          profile_id?: number | null;
          revoked?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'apiKeys_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'apiKeys_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
      decrypted_profiles: {
        Row: {
          businessname: string | null;
          created_at: string | null;
          decrypted_token: string | null;
          inactive: boolean | null;
          profile_id: number | null;
          token: string | null;
          token_ttl: string | null;
          type: Database['public']['Enums']['type'] | null;
          updated_at: string | null;
          user_id: string | null;
          verificationrequested: boolean | null;
          verified: boolean | null;
        };
        Insert: {
          businessname?: string | null;
          created_at?: string | null;
          decrypted_token?: never;
          inactive?: boolean | null;
          profile_id?: number | null;
          token?: string | null;
          token_ttl?: string | null;
          type?: Database['public']['Enums']['type'] | null;
          updated_at?: string | null;
          user_id?: string | null;
          verificationrequested?: boolean | null;
          verified?: boolean | null;
        };
        Update: {
          businessname?: string | null;
          created_at?: string | null;
          decrypted_token?: never;
          inactive?: boolean | null;
          profile_id?: number | null;
          token?: string | null;
          token_ttl?: string | null;
          type?: Database['public']['Enums']['type'] | null;
          updated_at?: string | null;
          user_id?: string | null;
          verificationrequested?: boolean | null;
          verified?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      decrypted_techinicians: {
        Row: {
          age: number | null;
          city: string | null;
          course: string | null;
          created_at: string | null;
          decrypted_city: string | null;
          decrypted_email: string | null;
          decrypted_phone: string | null;
          email: string | null;
          graduated: boolean | null;
          id: number | null;
          internships: Json[] | null;
          name: string | null;
          phone: string | null;
          school: string | null;
          school_id: number | null;
        };
        Insert: {
          age?: number | null;
          city?: string | null;
          course?: string | null;
          created_at?: string | null;
          decrypted_city?: never;
          decrypted_email?: never;
          decrypted_phone?: never;
          email?: string | null;
          graduated?: boolean | null;
          id?: number | null;
          internships?: Json[] | null;
          name?: string | null;
          phone?: string | null;
          school?: string | null;
          school_id?: number | null;
        };
        Update: {
          age?: number | null;
          city?: string | null;
          course?: string | null;
          created_at?: string | null;
          decrypted_city?: never;
          decrypted_email?: never;
          decrypted_phone?: never;
          email?: string | null;
          graduated?: boolean | null;
          id?: number | null;
          internships?: Json[] | null;
          name?: string | null;
          phone?: string | null;
          school?: string | null;
          school_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'techinicians_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['profile_id'];
          },
          {
            foreignKeyName: 'techinicians_school_id_fkey';
            columns: ['school_id'];
            referencedRelation: 'decrypted_profiles';
            referencedColumns: ['profile_id'];
          }
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      billing_help:
        | 'Requested'
        | 'Processing'
        | 'Solved'
        | 'Unsolvable'
        | 'Refunded';
      billing_status: 'Pending' | 'Paid' | 'Unpaid';
      request_types:
        | 'Create'
        | 'Climit'
        | 'Slimit'
        | 'Search'
        | 'Platform'
        | 'Update'
        | 'Ulimit'
        | 'Merge'
        | 'Recommended';
      type: 'S' | 'J';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
