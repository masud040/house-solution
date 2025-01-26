"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllOrders from "./AllOrders";

export default function OrderProcessTabsContainer({ allOrderedItems }) {
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(allOrderedItems);

  return (
    <div>
      <Tabs
        onSelect={(tab) => setSelectedTab(tab)}
        selectedTabClassName="order-process-active-tab"
        selectedIndex={selectedTab}
      >
        <TabList className="w-full mb-10 flex-start">
          <Tab className="order-process-tab">
            All <span>(0)</span>
          </Tab>
          <Tab className="order-process-tab">
            To Pay <span>(0)</span>
          </Tab>
          <Tab className="order-process-tab">
            To Ship <span>(0)</span>
          </Tab>
          <Tab className="order-process-tab">
            To Receive <span>(0)</span>
          </Tab>
          <Tab className="order-process-tab">
            To Review <span>(0)</span>
          </Tab>
        </TabList>

        <TabPanel>
          <AllOrders />
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
