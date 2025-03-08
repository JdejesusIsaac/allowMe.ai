declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CROSSMINT_API_KEY: string;
    NEXT_PUBLIC_CROSSMINT_CLIENT_ID: string;
    NEXT_PUBLIC_CROSSMINT_ENVIRONMENT: 'staging' | 'production';
  }
}

interface GoogleSignInProps {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
  children: React.ReactNode;
} 