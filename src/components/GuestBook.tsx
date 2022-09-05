import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { Button, Input, Flex, Text, Box, useColorModeValue } from "@chakra-ui/react";

const Signature: React.FC<{ name: string, message: string }> = ({ name, message }) => {
    return (
        <div>
            <Text>{message}</Text>
            <Text color={"gray.500"}>~ {name}</Text>
        </div>
    )
}

const LogOutBtn = () => {
    return (
        <Button variant='outline' size={"sm"} colorScheme={"red"} onClick={() => signOut()}>Log Out</Button>
    )
}

const GuestBook = () => {
    const { data: session, status } = useSession();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const ctx = trpc.useContext();
    const { data: messages } = trpc.useQuery(["guestbook.getAll"]);

    const guestbook = trpc.useMutation("guestbook.postMessage", {
        onMutate: () => {
            ctx.cancelQuery(["guestbook.getAll"]);

            let optimisticUpdate = ctx.getQueryData(["guestbook.getAll"]);
            if (optimisticUpdate) ctx.setQueryData(["guestbook.getAll"], optimisticUpdate);
        },
        onSettled: () => {
            ctx.invalidateQueries(["guestbook.getAll"]);
        },
    });

    const handleSubmit = () => {
        setLoading(true);

        if (message.length === 0) {
            setLoading(false);
            setError("Your message is empty!");
            return;
        }

        if (message.length > 100) {
            setLoading(false);
            setError("Your message should be less than 100 characters!");
            return;
        }

        guestbook.mutate({
            name: session?.user?.name as string,
            message,
        });

        setMessage("");
        setLoading(false);
        console.log("refetched");
    };

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (session) {
        return (
            <>
                <Flex direction={"column"} gap={6} >

                    {session.user?.image && (
                        <Flex gap={5} direction="row">
                            <Image 
                                src={session.user?.image}
                                alt="s"
                                width={60}
                                height={60}
                                style={{ borderRadius: "50%" }}
                            />
                            <Flex direction={"column"} alignItems="start" gap={1}>
                                <Text fontSize={['sm', 'lg', 'lg']}>Signed in as: {session.user.name}</Text>
                                <LogOutBtn />
                            </Flex>
                        </Flex>
                    )}

                    <Flex gap={5}>
                        <Input 
                            type="text" 
                            name="message"
                            id="message"
                            value={message}
                            placeholder="your message..."
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div>
                            <div>
                                <Button
                                    type="submit"
                                    variant={"outline"}
                                    disabled={loading}
                                    onClick={() => handleSubmit()}
                                    colorScheme={"green"}
                                >
                                    Comment
                                </Button>
                            </div>

                        </div>
                    </Flex>
        
                    <Flex gap={3} wrap="wrap" alignItems="center">
                            {messages?.map((msg: any, index: any) => {
                                return (
                                    <Box 
                                        key={index}
                                        bg={"gray.900"}
                                        rounded={["sm", "md", "md"]}
                                        p={6}
                                        overflow={"hidden"}
                                    >

                                        <Signature key={index} name={msg.name} message={msg.message} />
                                    </Box>
                                )
                            })}
                    </Flex>
                </Flex>
            </>
        )
    }

    return (
        <>
            <Flex direction={"column"} gap={2} mb={5}>
                <Text fontSize={['sm', 'lg', 'lg']}>Log in with Discord to continue!</Text>
                <Button maxW={"fit-content"} variant="outline" colorScheme={"green"} onClick={() => signIn("discord")}>
                    Log In
                </Button>
            </Flex>

            <Flex gap={3} wrap="wrap" alignItems="center">
                {messages?.map((msg: any, index: any) => {
                    return (
                        <Box 
                            key={index}
                            bg={"gray.900"}
                            rounded={["sm", "md", "md"]}
                            p={6}
                            overflow={"hidden"}
                        >

                            <Signature key={index} name={msg.name} message={msg.message} />
                        </Box>
                    )
                })}
            </Flex>
        </>
    )
}

export default GuestBook;