"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllOrders from "./AllOrders";
export default function OrderProcessTabsContainer({ ordered_items }) {
  console.log(ordered_items);
  const [selectedTab, setSelectedTab] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const addSearchParams = (value) => {
    params.set("active_tab", value);
    router.push(`?${params.toString()}`);
  };
  useEffect(() => {
    params.set("active_tab", "all");
    router.push(`?${params.toString()}`);
  }, []);

  function handleSelectTab(tab) {
    setSelectedTab(tab);
    switch (tab) {
      case 0:
        addSearchParams("all");
        break;
      case 1:
        addSearchParams("to-pay");
        break;
      case 2:
        addSearchParams("to-ship");
        break;
      case 3:
        addSearchParams("to-receive");
        break;
      case 4:
        addSearchParams("to-review");
        break;
      default:
        addSearchParams("all");
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
          <AllOrders allOrders={ordered_items} />
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
