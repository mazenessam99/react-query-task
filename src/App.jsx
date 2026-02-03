import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "./components/ui/spinner";

const App = () => {

	// const { data, isLoading, error } = useQuery({
	// 	queryKey: ["getPosts"],
	// 	queryFn: getPosts
	// });

	function groups(id){
		return queryOptions({
			queryKey:[id],
			queryFn:getPosts
			})
		}
		const { data, isLoading, error } = useQuery(groups(1));

		// ------- Suspense Query -------
		// const { data, isLoading, error } = useSuspenseQuery(groups(1));

	// fetch data
	async function getPosts() {
		const res=await fetch("http://localhost:3000/posts");
		if (!res.ok) throw new Error("Failed to fetch");
		return res.json();
	} 

	//Loading
	if (isLoading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spinner />
			</div>
		);

	// Error
	if (error)
		return (
			<p className="text-center text-red-500 mt-10">
				Something went wrong while loading posts
			</p>
		);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-6">
			{data.map((post) => (
				<Card
					key={post.id}
					className="text-left transition-all duration-300 border-r-primary border-r-4  cursor-pointer hover:-translate-y-2 hover:shadow-lg p-4 rounded-lg "
				>
					<CardHeader>
						<CardTitle className=" text-lg font-semibold"><span className="text-primary">Title:</span> {post.title}</CardTitle>
						<p className="text-sm text-foreground">
							{post.category} • By {post.author} • {post.createdAt}
						</p>
					</CardHeader>
					<CardContent>
						<p className="mb-2 text-gray-700"><span className="text-primary font-bold">Summary:</span> {post.summary}</p>
						<p className="text-sm font-bold text-muted-foreground">
							<span className="text-primary font-bold">Views:</span> {post.views}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default App;
