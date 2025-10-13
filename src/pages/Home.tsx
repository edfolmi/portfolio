import { useFetch } from "../hooks/useFetch";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const Home = () => {
  const { data, loading, error } = useFetch<{ id: number; title: string }[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App 🚀</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((item) => (
          <Card key={item.id} title={item.title}>
            <p>Post ID: {item.id}</p>
          </Card>
        ))}
      </div>
      <Button className="mt-6">See More</Button>
    </section>
  );
};

export default Home;
