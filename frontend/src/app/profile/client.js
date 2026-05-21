'use client';

import { useState, useRef, useEffect } from "react";
import { uploadForm } from "@/app/api/auth/actions";
import Form from "next/form";
import CropAvatar from "@/components/profile/CropAvatar";
import { Avatar, TextInput, Stack, Flex, Group, NativeSelect, NumberInput, Button, Text, Title, Modal } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconDownload } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import classes from "./client.module.css";

export default function ProfileClient({id, name, gender, birthday, height, weight, imageBlob}) {
  const router = useRouter();
  const editorRef = useRef(null);
  const [rawImageFile, setRawImageFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState("");
  const [opened, {open, close}] = useDisclosure(false);


  useEffect(() => {
    if (imageBlob) {
      const objectUrl = URL.createObjectURL(imageBlob);
      setObjectUrl(objectUrl);
    }
  },[imageBlob])
  

  const handleDrop = async (fileArray) => {
    const imageFile = fileArray[0];
    if (imageFile) {
      setRawImageFile(imageFile);
      open()
    }
  }

  const handleSave = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas(); // Cropped image as canvas
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // Create a FormData object
            const formData = new FormData();
            formData.append("image", blob); // Append the Blob as a file
            formData.append("id", id); // Add additional metadata (e.g., id)
  
            // Send the FormData via fetch
            const res = await fetch("/api/s3", {
              method: "POST",
              body: formData, // Use FormData as the request body
            });
  
            // Handle the response
            const resJson = await res.json();
            setObjectUrl(URL.createObjectURL(blob));
            close();
          } catch (error) {
            console.error("Failed to upload file:", error);
          }
        }
      }, "image/jpeg");
    }
  };
    
  const handleSubmit = async (formData) => {
    formData.append("id", id);
    try{
      await uploadForm(formData)
      notifications.show({
        message:"Submission Complete!"
      })
      router.refresh();
    } catch (error) {
      throw new Error("Error uploading form")
    }
}

  return (
    <section className="page-shell page-stack">
      <div className="page-heading">
        <Text className="eyebrow">Profile</Text>
        <Title className="page-title">Keep account details and nutrition inputs up to date</Title>
        <Text className="page-copy">
          Profile details support a more personal nutrition experience. Update your avatar,
          demographic information, and body metrics here.
        </Text>
      </div>
      <Flex className={classes.page}>
        <Flex className={`${classes.avatarContainer} section-card`}>
          {objectUrl? 
            <Avatar size={132} src={objectUrl} alt="profile"/> :
            <Avatar size={132} src='default-avatar.svg' alt='default avatar' />
          }
          <Dropzone
            onDrop={handleDrop}
            accept={IMAGE_MIME_TYPE}
            maxSize={5 * 1024 ** 2}
            className={classes.dropzone}
          >
            <Stack 
              align="center"
              justify="stretch"
            >
              <IconDownload size={72} color='black'/>
              <Text size='lg' fw={600}> Upload photos</Text>
              <Text size='sm' c='dimmed' ta="center"> JPEG, PNG, GIF files under 5MB</Text>
            </Stack>
          </Dropzone>
        </Flex>
        <div className={`${classes.formCard} section-card`}>
          <Form action={handleSubmit}>
            <Stack className={classes.formStack}>
              <TextInput
                label='Username'
                id='username'
                name='username'
                defaultValue={name}
                maxLength='15'
                minLength='3'
                required
                radius='xl'
              />
              <NativeSelect 
                name='gender'
                label='Gender'
                data={['','M','F']}
                defaultValue={gender ? gender : ''}
                radius='xl'
              />
              <DateInput
                name='birthday'
                minDate={new Date("1950-01-01")}
                label='Birthday'
                defaultValue={birthday? new Date(birthday) : null}
                radius='xl'
              />
              <Group grow>
                  <NumberInput
                    label='Height (cm)'
                    name='height'
                    min={120}
                    max={220}
                    defaultValue={height ? height : 170}
                    radius='xl'
                  />
                  <NumberInput
                    label='Weight (kg)'
                    name='weight'
                    min={0}
                    max={1000}
                    defaultValue={weight? weight : 60}
                    radius='xl'
                  />
              </Group>
              <Button type='submit' size='md' radius='xl' color='leaf.6'> Save profile </Button>
            </Stack>
          </Form>
        </div>
      </Flex>
      <Modal opened={opened} onClose={close} title="Crop Image">
          <CropAvatar ref={editorRef} image={rawImageFile} handleSave={handleSave} />
      </Modal>
    </section> 
  );
}
