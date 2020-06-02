package com.bjpowernode.ajax.web.action;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
 
public class EntityServlet1 extends HttpServlet {
 
	private static final long serialVersionUID = 1L;
	//private String uploadPath = "D:/aa-ʵ����/new"; // �ϴ��ļ���Ŀ¼
	private String uploadPath = "C:/Users/Administrator/Desktop/telescope-result/";
	File tempPathFile;
 
	// ��дdoPost�����������¼�ʶ������
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			// Create a factory for disk-based file items
			DiskFileItemFactory factory = new DiskFileItemFactory();
 
			// Set factory constraints
			factory.setSizeThreshold(40960); // ���û�������С��������40kb
			factory.setRepository(tempPathFile);// ���û�����Ŀ¼
 
			// Create a new file upload handler
			ServletFileUpload upload = new ServletFileUpload(factory);
			
            //����ϴ��ļ�������������
            //upload.setHeaderEncoding("UTF-8");
            upload.setHeaderEncoding("utf-8");
 
			// Set overall request size constraint
			upload.setSizeMax(41943040); // ��������ļ��ߴ磬������40MB
			System.out.println("��00");
			
			List<FileItem> items = upload.parseRequest(request);// �õ����е��ļ�
			System.out.println("��11");
			Iterator<FileItem> i = items.iterator();
			System.out.println("0��");
			while (i.hasNext()) {
				FileItem fi = (FileItem) i.next();
				String fileName = fi.getName();
				System.out.println("һ��");
				System.out.println(fileName);
				
				
				if (fileName != null) {
					System.out.println("����");
					File fullFile = new File(new String(fileName)); // ����ļ�����������
					System.out.println("����");
					File savedFile = new File(uploadPath, fullFile.getName());
					//SaveDataFile.creatFile(uploadPath, fullFile.getName());
					//�ļ��Ѿ�����ɾ��

					String filePth= uploadPath + "/" + fileName;
					File file = new File(filePth);
					if(!file.exists()){

					System.out.println("�ļ�������");
					}
					else{

					System.out.println("�����ļ�");

					file.delete();//ɾ���ļ�
					}
					
					System.out.println("�ļ�");
					fi.write(savedFile);
					System.out.println("daozhe");
				}
			}
			System.out.print("upload succeed");
		} catch (Exception e) {
			System.out.println("����");
 
		}
	}
}