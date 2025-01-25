"use client";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default function OrderProcessTabsContainer() {
  return (
    <div>
      <Tabs
        selectedTabClassName="order-process-active-tab"
        className="relative"
      >
        <TabList className="mb-10 flex-start">
          <Tab className="order-process-tab">All</Tab>
          <Tab className="order-process-tab">To Pay</Tab>
          <Tab className="order-process-tab">To Ship</Tab>
          <Tab className="order-process-tab">To Recive</Tab>
          <Tab className="order-process-tab">To Review</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
}
