
import { useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();

  const handleCreateGR = () => {
    router.push('/GR-Form');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-4">
        <button onClick={handleCreateGR} className="bg-green-500 text-white p-2 rounded">
          Create GR
        </button>
      </div>
    </div>
  );
}