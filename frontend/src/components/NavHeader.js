import {Avatar, Header, StyledOcticon, Text} from "@primer/components";
import {MarkGithubIcon} from "@primer/octicons-react";

export default function NavHeader() {
    return (
    <Header>
        <Header.Item>
            <Header.Link href="#" fontSize={2}>
                <StyledOcticon icon={MarkGithubIcon} size={32} mr={2} />
                <span>Epic Holiday Planner</span>
            </Header.Link>
        </Header.Item>
        <Header.Item full>Menu</Header.Item>
        <Header.Item mr={0}>
            <Avatar
                src="https://github.com/octocat.png"
                size={20}
                square
                alt="@octocat"
            />
        </Header.Item>
    </Header>
    )
}