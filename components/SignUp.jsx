import { useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { account } from "@/appwrite/appwriteconfig";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/ContextProvider";

const SignUp = ({ setLogin }) => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await account.create(uuidv4(), email, password, name);
      console.log(res);
      const res2 = await account.createEmailSession(email, password);
      const res3 = await account.get();
      setUser({ email: res3.email, id: res3.$id });
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (provider) => {
    const redirectUrl = `${window.location.origin}/oauth-callback`; // Define your redirect URL
    account.createOAuth2Session(provider, redirectUrl, redirectUrl);
  };

  return (
    <div className="flex flex-col mx-auto justify-center items-center w-screen h-screen bg-blue-100">
      <div className="w-[400px] p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form action="#" onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="p-2 w-full border rounded-sm border-gray-300"
            name="name"
            type="text"
            placeholder="Enter Name"
          />
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full border rounded-sm border-gray-300"
            name="email"
            type="text"
            placeholder="Enter Email"
          />
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full border rounded-sm border-gray-300"
            name="password"
            type="password"
            placeholder="Enter Password"
          />
          <div className="flex justify-center">
            {loading ? <Loader /> : <button type="submit" className="bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 rounded-sm">Sign Up</button>}
          </div>
        </form>
        <p className="text-center mt-4">Already a member? <span onClick={() => setLogin(true)} className="text-blue-500 underline cursor-pointer">Sign In</span></p>
        <div className="flex flex-col gap-2 mt-4">
          <button onClick={() => handleOAuthSignIn('google')} className="bg-red-600 py-2 px-4 text-white hover:bg-red-700 rounded-sm">Sign In with Google</button>
          <button onClick={() => handleOAuthSignIn('github')} className="bg-gray-800 py-2 px-4 text-white hover:bg-gray-900 rounded-sm">Sign In with GitHub</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

