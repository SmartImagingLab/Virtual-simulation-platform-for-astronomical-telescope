package com.bjpowernode.ajax.web.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SaveData extends HttpServlet {
	public static final String FILE_NAME = "Output.txt";//Ҫ�������ļ���
    //public static final String FILE_PATH = "f:/OrderSplit/";//�ļ�ָ����ŵ�·��
	public static final String FILE_PATH = "C:\\Users\\418\\Desktop\\���ƽ̨���\\";

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		//��ȡ�û���
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String num_path = request.getParameter("NumPath");
		
		System.out.println(username);
		String filename = num_path + ".txt";
		//String jsondata = request.getParameter("wewant");
		//�������ݿ���֤�û����Ƿ����
		FileOutputStream outFile = null;

        try {
        	String PATH = FILE_PATH + username + "\\";
            SaveDataFile.creatFile(PATH, filename);
            outFile = new FileOutputStream(PATH + filename);
     	   	outFile.write(password.getBytes());
     		//�ر�����Դ
     	   	outFile.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                outFile.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
	}

}
