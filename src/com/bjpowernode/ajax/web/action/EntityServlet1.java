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
	//private String uploadPath = "D:/aa-实验室/new"; // 上传文件的目录
	private String uploadPath = "C:/Users/Administrator/Desktop/telescope-result/";
	File tempPathFile;
 
	// 重写doPost方法，处理事件识别请求
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			// Create a factory for disk-based file items
			DiskFileItemFactory factory = new DiskFileItemFactory();
 
			// Set factory constraints
			factory.setSizeThreshold(40960); // 设置缓冲区大小，这里是40kb
			factory.setRepository(tempPathFile);// 设置缓冲区目录
 
			// Create a new file upload handler
			ServletFileUpload upload = new ServletFileUpload(factory);
			
            //解决上传文件名的中文乱码
            //upload.setHeaderEncoding("UTF-8");
            upload.setHeaderEncoding("utf-8");
 
			// Set overall request size constraint
			upload.setSizeMax(41943040); // 设置最大文件尺寸，这里是40MB
			System.out.println("已00");
			
			List<FileItem> items = upload.parseRequest(request);// 得到所有的文件
			System.out.println("已11");
			Iterator<FileItem> i = items.iterator();
			System.out.println("0级");
			while (i.hasNext()) {
				FileItem fi = (FileItem) i.next();
				String fileName = fi.getName();
				System.out.println("一级");
				System.out.println(fileName);
				
				
				if (fileName != null) {
					System.out.println("二级");
					File fullFile = new File(new String(fileName)); // 解决文件名乱码问题
					System.out.println("三级");
					File savedFile = new File(uploadPath, fullFile.getName());
					//SaveDataFile.creatFile(uploadPath, fullFile.getName());
					//文件已经存在删除

					String filePth= uploadPath + "/" + fileName;
					File file = new File(filePth);
					if(!file.exists()){

					System.out.println("文件不存在");
					}
					else{

					System.out.println("存在文件");

					file.delete();//删除文件
					}
					
					System.out.println("四级");
					fi.write(savedFile);
					System.out.println("daozhe");
				}
			}
			System.out.print("upload succeed");
		} catch (Exception e) {
			System.out.println("出错");
 
		}
	}
}