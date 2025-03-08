"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllOrders from "./AllOrders";
import ToPayOrders from "./ToPayOrders";
import ToReceiveOrder from "./ToReceiveOrders";
import ToReviewOrders from "./ToReviewOrders";
import ToShipOrder from "./ToShipOrders";

export default function OrderProcessTabsContainer({
  allOrderedItems,
  payOrderItems,
  shipedOrderItems,
  receivedOrderItems,
  reviewItems,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <Tabs
        onSelect={(tab) => setSelectedTab(tab)}
        selectedTabClassName="order-process-active-tab"
        selectedIndex={selectedTab}
      >
        <TabList className="w-full mb-6 flex-start">
          <Tab className="order-process-tab">
            All <span>({allOrderedItems?.length ?? 0})</span>
          </Tab>
          <Tab className="order-process-tab">
            To Pay <span>({payOrderItems?.length ?? 0})</span>
          </Tab>
          <Tab className="order-process-tab">
            To Ship <span>({shipedOrderItems?.length ?? 0})</span>
          </Tab>
          <Tab className="order-process-tab">
            To Receive <span>({receivedOrderItems?.length ?? 0})</span>
          </Tab>
          <Tab className="order-process-tab">
            To Review <span>({reviewItems?.length ?? 0})</span>
          </Tab>
        </TabList>

        <TabPanel>
          <AllOrders allItems={allOrderedItems} />
        </TabPanel>
        <TabPanel>
          <ToPayOrders payingItems={payOrderItems} />
        </TabPanel>
        <TabPanel>
          <ToShipOrder shipedItems={shipedOrderItems} />
        </TabPanel>
        <TabPanel>
          <ToReceiveOrder receivedItems={receivedOrderItems} />
        </TabPanel>
        <TabPanel>
          <ToReviewOrders reviewedItems={reviewItems} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
