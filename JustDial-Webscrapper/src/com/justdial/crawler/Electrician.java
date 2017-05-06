package com.justdial.crawler;

public class Electrician {

	public Electrician() {
		super();
	}

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Electrician(String name, String address, String numvotes, String phonenum) {
		super();
		this.name = name;
		this.address = address;
		this.numvotes = numvotes;
		this.phonenum = phonenum;
	}

	public String getNumvotes() {
		return numvotes;
	}

	public void setNumvotes(String numvotes) {
		this.numvotes = numvotes;
	}

	public String getPhonenum() {
		return phonenum;
	}

	public void setPhonenum(String phonenum) {
		this.phonenum = phonenum;
	}

	private String address;

	private String numvotes;

	private String phonenum;

}
