import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NextSeo } from "next-seo";
import React from "react";
import { FC } from "react";

const Dashboard: FC = () => {
    console.log("Loading dashboard");

    return (
        <>
            <NextSeo
                defaultTitle="Dogehouse Revived"
                title="Dogehouse Revived | Profile"
                description="Taking voice conversations to the moon 🚀"
                canonical="https://www.dogehouse.online/"
                additionalLinkTags={[
                    {
                        rel: "icon",
                        href: "https://cdn.lvk.sh/dogehouse/logo.svg",
                    },
                    {
                        rel: "apple-touch-icon",
                        href: "https://cdn.lvk.sh/dogehouse/logo.svg",
                        sizes: "76x76"
                    }
                ]}
            />
            <Grid>
                {
                    one &&
                    <Column>
                        <Logo small={!three} />
                        <FriendsList />
                    </Column>
                }
                <Column>
                    <SearchWrapper>
                        <Search />
                        {!two && <ProfileIcon />}
                    </SearchWrapper>
                    <div>
                        <ProfileWidgetDataContainer />
                    </div>
                </Column>
                {
                    two &&
                    <Column>
                        <ProfileWrapper>
                            <ProfileIcon />
                        </ProfileWrapper>
                        <div>
                            <ProfileWidgetDataContainer />
                            <Schedule />
                        </div>
                    </Column>
                }
            </Grid >
        </>
    );
};

export default Dashboard;
