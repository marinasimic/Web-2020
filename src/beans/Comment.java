package beans;

public class Comment {
	private User user;
	private Apartment apartment;
	private String message;
	private int rating;
	
	public Comment() {
		super();
	}

	public Comment(User user, Apartment apartment, String message, int rating) {
		super();
		this.user = user;
		this.apartment = apartment;
		this.message = message;
		this.rating = rating;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}
}
