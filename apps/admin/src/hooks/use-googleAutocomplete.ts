import { useEffect, useRef, useState } from "react";

const useGoogleAutocomplete = () => {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [addressComponents, setAddressComponents] = useState<{
    [key: string]: string;
  }>({});
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDV2wKeoUG0TSghZ1adR-t8z0cJJS8EM24&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      return script;
    };

    const script = loadGoogleMapsScript();

    script.addEventListener("load", () => initAutocomplete());

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    autoCompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("address") as HTMLInputElement,
      { types: ["address"] }
    );

    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current?.getPlace();
      if (place && place.address_components) {
        const newAddressComponents: { [key: string]: string } = {};
        place.address_components.forEach((component) => {
          const componentType = component.types[0];
          switch (componentType) {
            case "street_number":
              newAddressComponents.street_number = component.long_name;
              break;
            case "route":
              newAddressComponents.street = component.long_name;
              break;
            case "locality":
              newAddressComponents.city = component.long_name;
              break;
            case "administrative_area_level_1":
              newAddressComponents.state = component.short_name;
              break;
            case "postal_code":
              newAddressComponents.zipCode = component.long_name;
              break;
            case "country":
              newAddressComponents.country = component.long_name;
              break;
          }
        });
        setAddressComponents(newAddressComponents);

        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setLocation({ lat, lng });
        }
      }
    });
  };

  return { addressComponents, location };
};

export default useGoogleAutocomplete;
