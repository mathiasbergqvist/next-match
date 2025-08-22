import { auth, signOut } from '@/auth';
import { Button } from '@heroui/button';
import { FaRegSmile } from 'react-icons/fa';

const Home = async () => {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl text-red-500">Hello, App!</h1>

      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="bordered"
              startContent={<FaRegSmile size={20}></FaRegSmile>}
            >
              Sign Out
            </Button>
          </form>
        </div>
      ) : (
        <div className="text-red-500">No user session found.</div>
      )}
    </div>
  );
};

export default Home;
