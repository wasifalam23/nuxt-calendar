import * as Realm from "realm-web";

export const useRealmApp = () => {
	const config = useRuntimeConfig();
	const app = new Realm.App({ id: config.public.realmAppId });

	const bookings = useState("bookings", () => []);

	const bookingCol = async () => {
		const credentials = Realm.Credentials.anonymous();
		await app.logIn(credentials);

		const mongo = app.currentUser.mongoClient("mongodb-atlas");
		const collection = mongo.db("calendar").collection("bookings");

		return collection;
	};

	const allBookings = async () => {
		const col = await bookingCol();
		const allData = await col.find();

		bookings.value = allData;
	};

	allBookings();

	return {
		bookingCol,
		bookings,
	};
};
