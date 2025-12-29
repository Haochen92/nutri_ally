'use client';
import { useState } from 'react';
import { Button, Slider, Stack, Group } from "@mantine/core";
import AvatarEditor from "react-avatar-editor";


export default function CropAvatar ({image, handleSave, ref}) {
    const [zoom, setZoom] = useState(1);
    return(
        <Stack style={{position:"relative"}} align='center' justify='center'>
            <AvatarEditor
                ref={ref}
                image={image}
                width={400}
                height={400}
                border={4}
                borderRadius={0}
                scale={zoom}
                rotate={0}
            />
            <Group style={{width:'100%', height:'auto', justifyContent:'center'}} >
                <Slider w='100%' size="lg" value={zoom} onChange={setZoom} min={1} max={3} step={.1}/>
                <Button 
                    w ='100%' 
                    color='teal.9' 
                    size='md' onClick={handleSave}
                > Save Cropped Image
                </Button>
            </Group>
        </Stack>        
    )
}