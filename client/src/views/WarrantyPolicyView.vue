<template>
  <div class="warrantyPolicy">
    <div class="warrantyPolicyWrapper">
      <h1>Warranty Policy</h1>
      <div class="paragraphContainer">
        <span
          >AKRacing B.V. promises to repair or replace any AKRacing chair that
          is found to be defective in material or workmanship within five (5)
          and years from the date of original purchase so long as you, the
          original purchaser, still owns it. AKRacing further warrants the steel
          frame for a period of ten (10) years. The warranty is not
          transferrable. This is your sole and exclusive remedy. This warranty
          is subject to the provisions below.</span
        >
        <span
          >This warranty is effective with purchases made on or after August 1,
          2018 and covers exclusively the CORE, MASTERS, and OFFICE Series
          chairs. Purchases made before that date have a different warranty
          term, please consult your retailer. This warranty applies only to
          products sold and used within the European Union and United
          Kingdom.</span
        >
        <span
          >AKRacing desks are warrantied for the period of (2) years from the
          date of original purchase.</span
        >
      </div>
      <div class="exlusionsContainer">
        <span class="redTag">EXCLUSIONS</span>
        <span
          >This warranty does not apply and no other warranty applies to:</span
        >
        <ul>
          <li>
            Normal wear and tear, which are to be expected over the course of
            ownership.
          </li>
          <li>Misuse, abuse or excessive use of the product.</li>
          <li>
            Modifications or attachments to the product that are not approved by
            AKRacing.
          </li>
          <li>
            Products that were not installed, used, or maintained in accordance
            with product instructions and warnings.
          </li>
          <li>Products used for rental or commercial purposes.</li>
          <li>
            Damage caused by the carrier in-transit is handled under separate
            terms.
          </li>
        </ul>
        <span
          >Seating Usage: Normal use for seating is identified as the equivalent
          of a single shift, forty- (40) hour workweek. To the extent that a
          seating product is used in a manner exceeding this, the applicable
          warranty period will be reduced in a pro-rata manner.</span
        >
        <span
          >Certain AKRacing retailers buy special models direct from our
          factory. Those models are unique to those retailers and may have
          different warranty terms. It is retailers' responsibility to provide
          service and support for those models. We will be happy to assist you
          in identifying if you have one of those items and apologize that it is
          not possible for us to offer assistance on those.</span
        >
      </div>
      <div class="exlusionsContainer">
        <span class="redTag"
          >A WORD ABOUT COLOR VARIATIONS, FABRICS AND FINISHES</span
        >
        <span
          >AKRacing does not warrant the color-fastness or matching of colors,
          grains, or textures of covering materials. AKRacing reserves the right
          to make minor changes to the product that do not affect its
          performance, quality, or functionality.
        </span>
        <span
          >TO THE EXTENT ALLOWED BY LAW, AKRacing B.V. MAKES NO OTHER WARRANTY,
          EITHER EXPRESS OR IMPLIED, INCLUDING ANY WARRANTY OF MERCHANTABILITY
          OR FITNESS FOR A PARTICULAR PURPOSE. AKRACING WILL NOT BE LIABLE FOR
          ANY CONSEQUENTIAL OR INCIDENTAL DAMAGES.
        </span>
        <span
          >Notice to purchasers for home or personal use: Federal law does not
          permit the exclusion of certain implied warranties for consumer
          products. Therefore, if you are purchasing this product for home or
          personal use, the exclusion of implied warranties noted in the above
          paragraph does not apply to you. Some states do not allow the
          exclusion or limitation of incidental or consequential damages, so the
          above limitation or exclusion may not apply to you. This warranty
          gives you specific legal rights, and you may also have other rights
          which vary from state to state.
        </span>
        <span
          >Your AKRacing dealer is our mutual partner in supporting your
          warranty requests. Please contact your place of purchase for initial
          or out of box warranty issues. After 60 days, please contact us
          directly at eu-service@akracing.com. Please give us full details,
          including date and place of purchase, nature of defect and your
          contact information so that we can follow up with any questions.
          Please allow us a full business day to respond.
        </span>
      </div>
      <div class="warrantyClaim">
        <span class="warrantyTitle">Warranty Claim Form</span>
        <div class="productRegistrationForm">
          <div class="productRegistrationFormName">
            <input type="text" placeholder="First Name*" />
            <input type="text" placeholder="Last Name*" />
          </div>
          <input class="productRegistrationFormEmail" placeholder="Email*" />
          <input class="productRegistrationFormEmail" placeholder="Subject*" />
          <textarea
            class="productRegistrationFormDesc"
            placeholder="Please describe your issue*"
            rows="3"
          />
          <input type="text" placeholder="Country of purchase*" />
          <div class="productRegistrationFormWhen">
            <input type="text" placeholder="Date of Purchase*" />
            <div class="proofButton">Proof of Purchase (receipt)</div>
          </div>
          <div class="submitButton">Submit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.warrantyPolicy {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px 0;
}

.warrantyPolicyWrapper {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  color: #fff;
}

.paragraphContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exlusionsContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.redTag {
  font-size: 18px;
  color: var(--primary);
  font-weight: 600;
}

.productRegistrationForm {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.productRegistrationFormName {
  display: flex;
  gap: 20px;
}

.productRegistrationFormName input {
  width: 100%;
}

.productRegistrationFormDesc{
    
}

input {
  height: 40px;
  padding: 0 10px;
  background-color: black;
  outline: none;
  border: 1px solid #fff;
  border-radius: 2px;
  color: lightgrey;
}

.productRegistrationFormDesc{
  padding: 0 10px;
  background-color: black;
  outline: none;
  border: 1px solid #fff;
  border-radius: 2px;
  color: lightgrey;
}

select {
  height: 40px;
  padding: 0 10px;
  background-color: black;
  outline: none;
  border: 1px solid #fff;
  border-radius: 2px;
  color: lightgrey;
}

.productRegistrationFormWhen {
  display: flex;
  gap: 20px;
  cursor: pointer;
}

.proofButton {
  width: 100%;
  padding: 7px;
  border: 1px solid #fff;
  color: #fff;
  font-weight: 300;
}

.submitButton {
  width: 100%;
  text-align: center;
  padding: 10px;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  background-color: var(--primary);
  letter-spacing: 1px;
}

@media (max-width: 800px) {
  .warrantyPolicy{
    margin: 40px 20px;
  }

  .warrantyClaim{
    width: 100%;
  }

  .warrantyPolicyWrapper{
    width: 100%;
  }

  .productRegistrationForm{
    width: 100%;
  }

  .productRegistrationFormName{
    flex-direction: column;
  }

  .productRegistrationFormWhen{
    flex-direction: column;
  }
}
</style>
