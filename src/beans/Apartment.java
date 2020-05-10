package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.awt.Image;
import java.time.LocalTime;

import enums.ApartmentType;

public class Apartment {
    private ApartmentType type;
    private int roomNumber;
    private int guestNumber;
    private Location location;
    private List<Date> bookableDates = new ArrayList<Date>();
    private List<Date> bookedDates = new ArrayList<Date>();
    private User host;
    private List<Comment> comments = new ArrayList<Comment>();
    private List<Image> images = new ArrayList<Image>();
    private int pricePerNight;
    private LocalTime checkInTime = LocalTime.of(14, 0);
    private LocalTime checkOutTime = LocalTime.of(10, 0);
    private boolean active;
    private List<Amenity> amenities = new ArrayList<Amenity>();
    private List<Reservation> reservations = new ArrayList<Reservation>();

    public Apartment() {
        super();
    }

    public Apartment(ApartmentType type, int roomNumber, int guestNumber, Location location, User host,
            int pricePerNight, boolean active) {
        super();
        this.type = type;
        this.roomNumber = roomNumber;
        this.guestNumber = guestNumber;
        this.location = location;
        this.host = host;
        this.pricePerNight = pricePerNight;
        this.active = active;
    }

    public Apartment(ApartmentType type, int roomNumber, int guestNumber, Location location, List<Date> bookableDates,
            List<Date> bookedDates, User host, List<Comment> comments, List<Image> images, int pricePerNight,
            LocalTime checkInTime, LocalTime checkOutTime, boolean active, List<Amenity> amenities,
            List<Reservation> reservations) {
        super();
        this.type = type;
        this.roomNumber = roomNumber;
        this.guestNumber = guestNumber;
        this.location = location;
        this.bookableDates = bookableDates;
        this.bookedDates = bookedDates;
        this.host = host;
        this.comments = comments;
        this.images = images;
        this.pricePerNight = pricePerNight;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.active = active;
        this.amenities = amenities;
        this.reservations = reservations;
    }

    public ApartmentType getType() {
        return type;
    }

    public void setType(ApartmentType type) {
        this.type = type;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public int getGuestNumber() {
        return guestNumber;
    }

    public void setGuestNumber(int guestNumber) {
        this.guestNumber = guestNumber;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Date> getBookableDates() {
        return bookableDates;
    }

    public void setBookableDates(List<Date> bookableDates) {
        this.bookableDates = bookableDates;
    }

    public List<Date> getBookedDates() {
        return bookedDates;
    }

    public void setBookedDates(List<Date> bookedDates) {
        this.bookedDates = bookedDates;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public int getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(int pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
