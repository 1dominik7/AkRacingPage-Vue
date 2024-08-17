<template>
  <div class="returnsExchangePolicy">
    <div class="returnsExchangesPolicyWrapper">
      <h1>Returns & Refund Policy</h1>
      <p>
        <span
          >We adopt a 30 days return policy which means that all products
          purchased on this website may be returned to us within 30 days from
          the delivery date, based our carrier tracking. You must contact us
          within this timeframe and ensure that the product is returned to us
          without any undue delays. Returned products must be returned in the
          same condition as they were sent and they must be sent in its original
          packaging.</span
        >
        <span
          >If the product is faulty when you receive it, we will be happy to
          resolve the issue. Please <b>open a warranty claim</b>, so we can assist you
          further.
        </span>
        <span
          >If you changed your mind or if you are unhappy with the product for
          some other reason, and you wish to return it, please note that the
          cost of shipping will fall on you. It is your responsibility that the
          package arrives safely to us so we recommend that you use a courier
          service where it is possible to track the shipment.
        </span>
      </p>
      <div class="returns">
        <h4>HOW RETURNS WORK</h4>
        <p>
          <span
            >We are only able to review return requests for products purchased
            on this website directly. The must be in original packaging and
            completely unassembled to qualify for a refund. To initiate a
            return, please contact us at: eu-service@akracing.com.</span
          >
          <span
            >As soon as we have received the product(s) and made an inspection
            we will inform you of our decision. If a refund is approved, we will
            automatically credit the purchase to your original method of
            payment. If a pre-paid shipping label was requested, its cost will
            be deducted from the refund amount.</span
          >
          <span
            >If the product(s) is damaged, not in its original condition or
            missing parts we will inform you if you are eligible for a partial
            refund. The decision is made on a case to case depending on the
            severity of the damages or what parts are missing.</span
          >
          <span
            >Please note, we are unable to make changes, cancel or refund an
            order after it has been placed, so please check the accuracy of your
            order prior to placing it.</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.returnsExchangePolicy {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0;
}

.returnsExchangesPolicyWrapper {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.returnsExchangesPolicyWrapper p {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.returns {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

b{
    color: var(--primary);
    border-bottom: 1px solid rgb(70, 69, 69);
}

@media (max-width: 800px) {
  .returnsExchangePolicy{
    margin: 40px 20px;
  }

  .returnsExchangesPolicyWrapper{
    width: 100%;
  }
}
</style>
