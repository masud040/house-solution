"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default function OrderProcessTabsContainer() {
  const [selectedTab, setSelectedTab] = useState(0);
  function handleSelectTab(tab) {
    switch (tab) {
      case 0:
        // setSelectedTab("all");
        break;
      case 1:
        // setSelectedTab("to-pay");
        break;
      case 2:
        // setSelectedTab("to-ship");
        break;
      case 3:
        // setSelectedTab("to-receive");
        break;
      case 4:
        // setSelectedTab("to-review");
        break;
      default:
        // setSelectedTab("all");
        break;
    }
  }

  return (
    <div>
      <Tabs
        onSelect={(tab) => handleSelectTab(tab)}
        selectedTabClassName="order-process-active-tab"
        selectedIndex={selectedTab}
      >
        <TabList className="w-full mb-10 flex-start">
          <Tab className="order-process-tab">All</Tab>
          <Tab className="order-process-tab">To Pay</Tab>
          <Tab className="order-process-tab">To Ship</Tab>
          <Tab className="order-process-tab">To Receive</Tab>
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
