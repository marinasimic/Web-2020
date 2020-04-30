package beans;

import java.util.List;

import enums.*;

public class User {
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private Gender gender;
	private Role role;
	private List<Apartment> rentedApartments;
	private List<Reservation> reservations;	
	
	public User(){}
	
	public User(String username, String password, String firstName, String lastName, Gender gender, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.role = role;
	}
	
	public User(String username, String password, String firstName, String lastName, String gender) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;

		switch(gender){
		case "Male":
			this.gender = Gender.MALE;
			break;
		case "Female":
			this.gender = Gender.FEMALE;
			break;
		default:
			this.gender = Gender.UNKNOWN;
			break;
		}
		
		this.role = Role.GUEST;
	}
	
	public User(String username, String password, String firstName, String lastName, String gender, String role) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		
		switch(gender){
			case "Male":
				this.gender = Gender.MALE;
				break;
			case "Female":
				this.gender = Gender.FEMALE;
				break;
			default:
				this.gender = Gender.UNKNOWN;
				break;
		}
		
		switch(role){
			case "Administrator":
				this.role = Role.ADMINISTRATOR;
				break;
			case "Host":
				this.role = Role.HOST;
				break;
			default:
				this.role = Role.GUEST;
				break;
		}
	}

	public User(String username, String password, String firstName, String lastName, Gender gender, Role role,
			List<Apartment> rentedApartments, List<Reservation> reservations) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.role = role;
		this.rentedApartments = rentedApartments;
		this.reservations = reservations;
	}

	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public Gender getGender() {
		return gender;
	}
	
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	
	public Role getRole() {
		return role;
	}
	
	public void setRole(Role role) {
		this.role = role;
	}
	
	public List<Apartment> getRentedApartments() {
		return rentedApartments;
	}
	
	public void setRentedApartments(List<Apartment> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}
	
	public List<Reservation> getReservations() {
		return reservations;
	}
	
	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}	
}
