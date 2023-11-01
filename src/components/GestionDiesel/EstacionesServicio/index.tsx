import BaseLayout from "layouts/pages/account/components/BaseLayout";
import React from "react";

type Props = {};

function EstacionesServicio({}: Props) {
  return (
    <BaseLayout>
      <iframe
        width="100%"
        height="450"
        style={{ border: "0" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBU3qNYrMoug2Qot115mjSBFpL9BM15aOw&q=Space+Needle,Seattle+WA"
      ></iframe>
    </BaseLayout>
  );
}

export default EstacionesServicio;
