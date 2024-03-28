<script setup>
	const bookings = ref(null);
	const slotIndex = ref(null);
	const disabledSlots = ref([]);
	const slotDisable = ref(null);

	const emit = defineEmits(["slot", "next"]);
	const { selectedDate, slots, time, index, timeIndex } = defineProps([
		"selectedDate",
		"bookings",
		"slots",
		"time",
		"index",
		"timeIndex",
	]);

	const { bookingCol } = useRealmApp();

	// console.log(selectedDate, bookings, slots);
	const getSlotIndex = (index) => {
		emit("slot", index);
		slotIndex.value = slots[index];
	};

	onMounted(() => {
		console.log(slots[index]);

		const getBookings = async () => {
			const col = await bookingCol();
			bookings.value = await col.find();

			const bookingsData = bookings.value.filter((booking) => {
				const bookingDate = new Date(booking.schedule_date);
				const pickedDate = new Date(selectedDate);

				const bookingDateWithoutTime = new Date(
					bookingDate.getFullYear(),
					bookingDate.getMonth(),
					bookingDate.getDate()
				);

				const selectedDateWithoutTime = new Date(
					pickedDate.getFullYear(),
					pickedDate.getMonth(),
					pickedDate.getDate()
				);

				// console.log(bookingDateWithoutTime, selectedDateWithoutTime);
				return (
					bookingDateWithoutTime.getTime() === selectedDateWithoutTime.getTime()
				);
			});

			const timeSlots = bookingsData.map((data) => data.time_slot);
			disabledSlots.value = timeSlots;
			console.log(disabledSlots.value);
		};

		getBookings();
	});
</script>

<template>
	<div
		v-show="bookings !== null"
		:class="`flex gap-2 ${
			disabledSlots.find((slot) => slot === slots[index])
				? 'pointer-events-none'
				: ''
		}`">
		<div
			class="w-full whitespace-nowrap text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg px-5 py-2.5 text-center mb-2 cursor-pointer"
			@click="getSlotIndex(index)">
			{{ time }}
		</div>
		<transition name="fade">
			<div
				v-if="timeIndex === index"
				class="w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg px-5 py-2.5 text-center mb-2 cursor-pointer"
				@click="$emit('next')">
				Next
			</div>
		</transition>
	</div>
</template>
