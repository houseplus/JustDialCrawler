package com.jd.main;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class MainApp {

	public static void main(String[] args) throws IOException {

		Document document = Jsoup.connect("https://www.justdial.com/Bangalore/Electricians/nct-10184166/page-3").get();

		System.out.println(document);
		document.getAllElements();
		System.out.println();

	}

}
