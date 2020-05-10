package dao;

import java.util.ArrayList;
import java.util.List;

import beans.Amenity;

public class AmenityDAO {
	private List<Amenity> amenities = new ArrayList<Amenity>();
	
	public AmenityDAO(){
		Amenity a1 = new Amenity(1, "Kitchen");
		Amenity a2 = new Amenity(2, "Bathroom");
		
		amenities.add(a1);
		amenities.add(a2);		
	}
	
	public AmenityDAO(String contextPath) {
		Amenity a1 = new Amenity(1, "Kitchen");
		Amenity a2 = new Amenity(2, "Bathroom");
		
		amenities.add(a1);
		amenities.add(a2);	
		// TODO: Reading amenities from the file
	}
	
	public List<Amenity> findAll(){
		
		return amenities;
	}
}
