package model;

public class Address {
	private String street;
	private int number;
	private String place;
	private String postalCode;
	
	public Address(){
		super();
	}
	
	public Address(String street, int number, String place, String postalCode) {
		super();
		this.street = street;
		this.number = number;
		this.place = place;
		this.postalCode = postalCode;
	}
	
	public String getStreet() {
		return street;
	}
	
	public void setStreet(String street) {
		this.street = street;
	}
	
	public int getNumber() {
		return number;
	}
	
	public void setNumber(int number) {
		this.number = number;
	}
	
	public String getPlace() {
		return place;
	}
	
	public void setPlace(String place) {
		this.place = place;
	}
	
	public String getPostalCode() {
		return postalCode;
	}
	
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
}