import { client } from "../../libs/client";
import Link from "next/link";
import { Flex, Heading, Box, Tag } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { format } from "date-fns";

export default function BlogId({ blog }) {
  return (
    <main>
      <Link href="/">
        <Flex as="p" cursor="pointer" align="center">
          <ArrowBackIcon mr={1} />
          <Box as="span">戻る</Box>
        </Flex>
      </Link>
      <Box mt={4}>
        <Box as="p" borderBottom="1px">
          {format(new Date(blog.publishedAt), "yyyy-MM-dd HH:mm:ss")}
        </Box>
        <Heading as="h1" fontSize="3xl" mt={2}>
          {blog.title}
        </Heading>
        <Box>
          {blog.tags.map((tag) => (
            <Tag key={tag.id} colorScheme="cyan" mr={1}>
              {tag.name}
            </Tag>
          ))}
        </Box>
        <Box
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
          mt={2}
        />
      </Box>
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
