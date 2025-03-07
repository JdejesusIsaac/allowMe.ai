# AllowMe Landing Page

## Environment Variables Setup

This application requires certain environment variables to function properly. These variables are used for Google OAuth authentication and application URL configuration.

### Required Environment Variables

1. **NEXT_PUBLIC_GOOGLE_CLIENT_ID**: Your Google OAuth client ID
2. **GOOGLE_CLIENT_SECRET**: Your Google OAuth client secret
3. **NEXT_PUBLIC_APP_URL**: The URL where your application is running

### Setting Up Environment Variables

1. Create a `.env.local` file in the root directory of the project
2. Add the following variables to the file:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Replace `your-google-client-id-here` with your actual Google OAuth client ID
4. Replace `your-google-client-secret-here` with your actual Google OAuth client secret
5. Update the `NEXT_PUBLIC_APP_URL` if your application is running on a different URL

### Getting Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the OAuth consent screen
6. For "Application type", select "Web application"
7. Add authorized JavaScript origins and redirect URIs
   - JavaScript origins: `http://localhost:3000` (or your app URL)
   - Redirect URIs: `http://localhost:3000/api/auth/callback/google` (or your app URL + path)
8. Click "Create" and copy the generated client ID and client secret

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 