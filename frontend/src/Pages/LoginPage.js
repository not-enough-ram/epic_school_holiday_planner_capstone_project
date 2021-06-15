import styled from "styled-components/macro";
import {Button, Text, TextInput} from "@primer/components";

export default function LogInPage() {

    return (
        <Wrapper>
            <form onSubmit={null}>
                <Wrapper>
                    <Text fontFamily={"Arial"}>
                        Username
                        <TextInput
                            type="text"
                            name="username"
                            value={"null"}
                            onChange={"null"}
                            placeholder="Octocat"
                        />
                    </Text>

                    <Text fontFamily={"Arial"}>
                        Password
                        <TextInput
                            type="password"
                            name="password"
                            value={"null"}
                            onChange={"null"}
                            placeholder={"password"}
                        />
                    </Text>
                    <Button>Login</Button>
                </Wrapper>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
        
    *:not(img):not(a){
    margin: 10px;
    }
`