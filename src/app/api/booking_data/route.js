import db from "@/lib/db";
import { getTokenData } from "@/utils/jwtHandler";
import { cookies } from "next/headers";

 function clearToken(tokenName) {
  console.log("clearing token",tokenName);
  
  const cookieStore = cookies();
  cookieStore.delete(tokenName);
}

export async function DELETE(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_token")?.value || null;
  if (!token) {
    return Response.json({ error: "No token found." }, { status: 400 });
  }
  try {
    cookieStore.delete("guest_token");
    return Response.json({ message: "Token cleared successfully." });
  } catch (error) {
    console.error("Error clearing token:", error);
    return Response.json({ error: "Failed to clear token." }, { status: 500 });
  }
}

export async function POST(req) {
  const { id, role, formData } = await req.json();


  const {
    "step1": { fullName, email, phoneNumber, wayToConnect },
    "step2": { travelDate, numberOfBags, numberOfpassengers, typeOfReservation },
    "step3": { pickup, dropOff },
    "step4": { carId },
    "step5": { additional },
  } = formData;
  const validwayToConnect = wayToConnect?.toLowerCase() || "email";
  const validtypeOfReservation = typeOfReservation?.toLowerCase() || "per-mile";

  console.log(validtypeOfReservation, validwayToConnect);

  // let bookings_data = await req.json();
  let bookingUserId = id;

  try {
    // Insert into bookings_data queries
    const query = role === 'guest' ? `INSERT INTO bookings_data (guest_id, phone, best_way_to_connect, car_id, travel_date, no_of_bags, no_of_passengers, reservation_type, pickup_address, dropoff_address, price, additional_comments, distance)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)` : `INSERT INTO bookings_data (user_id, phone, best_way_to_connect, car_id, travel_date, no_of_bags, no_of_passengers, reservation_type, pickup_address, dropoff_address, price, additional_comments, distance)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;


    if (role === 'guest') {
      // Insert into guests_data
      const [existingUser] = await db.execute("SELECT * FROM guests_data WHERE email = ?", [email]);

      if (existingUser.length) {
        // insert into bookings_data for existing guest
        const [result1] = await db.execute(query, [existingUser[0].id, phoneNumber, validwayToConnect, carId, travelDate, numberOfBags, numberOfpassengers, validtypeOfReservation, pickup, dropOff, 0.0, additional, 0.0]
        );
        console.log("id of booking", result1.insertId);
        // clear token
        // await DELETE();
        clearToken("guest_token");
        // return success message
        return Response.json({ message: "Service booked successfully. Booking ID is " + result1.insertId }, { status: 201 });
      }
      // if guest  not found create new guest
      await db.execute(
        `INSERT INTO guests_data (id, full_name, email)
           VALUES (?, ?, ?)`,
        [id, fullName, email]
      );

      // insert into bookings_data
      const [result2] = await db.execute(query, [bookingUserId, phoneNumber, wayToConnect, carId, travelDate, numberOfBags, numberOfpassengers, typeOfReservation, pickup, dropOff, 0.0, additional, 0.0]
      );

      console.log("id of booking", result2.insertId);
      // clear token
      // await DELETE();
      clearToken("guest_token");
      // return success message
      return Response.json({ message: "Service booked successfully. Booking ID is " + result2.insertId }, { status: 201 });

    }


    // if user found insert into bookings_data
    // also get user id
    const [result3] = await db.execute(query, [bookingUserId, phoneNumber, wayToConnect, carId, travelDate, numberOfBags, numberOfpassengers, typeOfReservation, pickup, dropOff, 0.0, additional, 0.0]
    );
    console.log("id of booking", result3.insertId);

    // clear token
    // await DELETE();
    clearToken("guest_token");
    // return success message
    return Response.json({ message: "Service booked successfully. Booking ID is " + result3.insertId }, { status: 201 });

  } catch (error) {
    console.error("Booking Error:", error);
    return Response.json({ message: "Error during booking a service, Please try later.", error: error.message }, { status: 500 });

  }
}







