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
          <Tab className="product-details-tab">Details</Tab>
          <Tab className="product-details-tab">Review & Rating</Tab>
          <Tab className="product-details-tab">Discussion</Tab>
        </TabList>
        <TabPanel>
          <Details description={description} />
        </TabPanel>
        <TabPanel>
          <RatingAndReview />
        </TabPanel>
        <TabPanel>
          <Discussion />
        </TabPanel>
      </Tabs>
    </div>
  );
};
