package dao;

import java.util.ArrayList;
import java.util.List;

import beans.Apartment;

public class ApartmentDAO {
	private List<Apartment> apartments = new ArrayList<>();
	
	public ApartmentDAO() {
	}
	
	public ApartmentDAO(String contextPath) {
		// TODO: Reading apartments from the file
	}
	
	public List<Apartment> getAllUsersApartments(String username){
		
		List<Apartment> userApartments = new ArrayList<>();
		
		for(Apartment a : apartments){
			if( a.getHost().getUsername().equals(username) ){
				userApartments.add(a);
			}
		}
		
		return userApartments;
	}
	
	public boolean add(Apartment apartment){
		return apartments.add(apartment);
	}
	
	public boolean update(Apartment apartment){
		//TODO: Find apartment and update it
		// But how?
		return false;
	}
	
	public List<Apartment> findAll(){
		return apartments;
	}
}
