import { useState } from "react";
import Head from "next/head";

import Layout from "@/components/Layout";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Form from "@/components/Form";
import FormRow from "@/components/FormRow";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleOnGenerate(e) {
    e.preventDefault();

    const fields = Array.from(e.currentTarget.elements);
    const prompt = fields.find((el) => el.name === "prompt").value;

    setIsLoading(true);
    setImage(undefined);

    const { image } = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        prompt,
      }),
    }).then((res) => res.json());

    setImage(image);
    setIsLoading(false);
  }

  return (
    <Layout>
      <Head>
        <title>Image Generator</title>
        <meta name="description" content="Generate an image!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container size="content">
          <Form className={styles.form} onSubmit={handleOnGenerate}>
            {image && <img src={image} alt="Generated Image" />}
            <h2>Generate an Image</h2>
            <FormRow>
              <FormInput type="text" name="prompt" />
            </FormRow>
            <FormRow>
              <Button disabled={isLoading}>Generate</Button>
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  );
}
