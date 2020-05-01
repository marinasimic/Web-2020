package beans;

import java.util.Date;

import enums.ReservationStatus;

public class Reservation {
	private Apartment apartment;
	private Date startDate;
	private int nights = 1;
	private Double price;
	private String message;
	private ReservationStatus status;

	public Reservation() {
		super();
	}

	public Reservation(Apartment apartment, Date startDate, int nights, Double price, String message,
	        ReservationStatus status) {
		super();
		this.apartment = apartment;
		this.startDate = startDate;
		this.nights = nights;
		this.price = price;
		this.message = message;
		this.status = status;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getNights() {
		return nights;
	}

	public void setNights(int nights) {
		this.nights = nights;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ReservationStatus getStatus() {
		return status;
	}

	public void setStatus(ReservationStatus status) {
		this.status = status;
	}
}
