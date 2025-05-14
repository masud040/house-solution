"use client";
import { ActiveLink } from "../ActiveLink";
export default function UserSideMenu({ userId }) {
  return (
    <ul className="gap-2 p-5 flex-column">
      <ActiveLink name="Manage My Account" path="/profile" profile={true} />
      <ul className="gap-1 pb-3 ps-3 flex-column">
        <ActiveLink name="Address Book" path="/profile/address" small={true} />
      </ul>
      <ActiveLink
        name="My Orders"
        path={`/profile/order/${userId}`}
        profile={true}
      />
      <ul className="gap-1 pb-3 ps-3 flex-column">
        <ActiveLink
          name="My Returns"
          path="/profile/order/returns"
          small={true}
        />
        <ActiveLink
          name="My Cancellations"
          path="/profile/order/cancellations"
          small={true}
        />
      </ul>
      <ActiveLink name="My Reviews" path="/profile/reviews" profile={true} />
    </ul>
  );
}
