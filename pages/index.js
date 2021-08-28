import { Box, UnorderedList, ListItem } from "@chakra-ui/react";
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog }) {
	return (
		<Box>
			<UnorderedList>
				{blog.map((blog) => (
					<ListItem key={blog.id}>
						<Link href={`/blog/${blog.id}`}>
							<a>{blog.title}</a>
						</Link>
					</ListItem>
				))}
			</UnorderedList>
		</Box>
	);
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
	const data = await client.get({ endpoint: "blog" });

	return {
		props: {
			blog: data.contents,
		},
	};
};
