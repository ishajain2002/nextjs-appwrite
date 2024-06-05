import { useEffect } from "react";
import { useRouter } from "next/router";
import { account } from "@/appwrite/appwriteconfig";
import { useContext } from "react";
import { UserContext } from "@/context/ContextProvider";

const OAuthCallback = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const completeOAuth = async () => {
      try {
        const res = await account.get();
        // Save user data and redirect
        setUser({ email: res.email, id: res.$id });
        router.push("/");
      } catch (error) {
        console.log("OAuth callback error:", error);
        router.push("/login");
      }
    };

    completeOAuth();
  }, [router, setUser]);

  return <div>Loading...</div>;
};

const googleLogin = async () => {
    try {
      const authUrl = await appwrite.account.getOAuth2AuthorizationURL('google', 'https://example.com/callback');
      window.location.href = authUrl;
    } catch (error) {
      console.error(error);
    }
  };
  
  const githubLogin = async () => {
    try {
      const authUrl = await appwrite.account.getOAuth2AuthorizationURL('github', 'https://example.com/callback');
      window.location.href = authUrl;
    } catch (error) {
      console.error(error);
    }
  };

export default OAuthCallback;

