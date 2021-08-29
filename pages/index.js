import { Heading, Container, UnorderedList, ListItem } from "@chakra-ui/react";
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog }) {
  return (
    <Container maxW="container.lg">
      <Heading as="h3">Nutrition Blog</Heading>
      <Heading as="h6">記事一覧</Heading>
      <UnorderedList>
        {blog.map((blog) => (
          <ListItem key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Container>
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
