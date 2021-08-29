import {
  Box,
  Tag,
  Flex,
  Text,
  Image,
  Heading,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";
import { client } from "../libs/client";
import { format } from "date-fns";

export default function Home({ blog }) {
  return (
    <Container maxW="container.lg" p={4}>
      <Heading as="h1">Nutrition Blog</Heading>
      <Heading mt={4} as="h2" fontSize="lg">
        記事一覧
      </Heading>
      <Box mt={2}>
        {blog.map((blog) => (
          <Box>
            <Text fontWeight="bold" fontSize="sm">
              {format(new Date(blog.createdAt), "yyyy-MM-dd HH:mm:ss")}
            </Text>
            <Flex
              mb={2}
              border="1px"
              p={2}
              borderColor="gray.500"
              borderRadius="4px"
            >
              {blog.eyeCatchImage && (
                <Image
                  src={blog.eyeCatchImage.url}
                  boxSize="100px"
                  objectFit="cover"
                  alt={blog.title}
                />
              )}
              <Box ml={3}>
                <Text
                  fontWeight="bold"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                </Text>
                <Box>
                  {blog.tags.map((tag) => (
                    <Tag key={tag.id} colorScheme="cyan" mr={1}>
                      {tag.name}
                    </Tag>
                  ))}
                </Box>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
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
