"use client";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Details from "./Details";
import Discussion from "./Discussion";
import RatingAndReview from "./RatingAndReview";
export const ProdcutDescription = ({ description }) => {
  return (
    <div className="pb-16 mt-10">
      <Tabs selectedTabClassName="active-tab">
        <TabList className="flex items-center gap-3 md:gap-12 lg:gap-[72px] mb-10">
          <Tab>Details</Tab>
          <Tab>Review & Rating</Tab>
          <Tab>Discussion</Tab>
        </TabList>
        <TabPanel>
          <Details description={description} />
        </TabPanel>
        <TabPanel>
          <RatingAndReview description={description} />
        </TabPanel>
        <TabPanel>
          <Discussion description={description} />
        </TabPanel>
      </Tabs>
    </div>
  );
};
