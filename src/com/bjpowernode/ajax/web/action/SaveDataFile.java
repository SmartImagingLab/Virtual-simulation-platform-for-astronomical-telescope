package com.bjpowernode.ajax.web.action;

import java.io.File;
import java.io.IOException;

public class SaveDataFile {
    
	public static void creatFile(String filePath, String fileName) {
        File folder = new File(filePath);
        //�ļ���·��������
        if (!folder.exists() && !folder.isDirectory()) {
            System.out.println("�ļ���·�������ڣ�����·��:" + filePath);
            folder.mkdirs();
        } else {
            System.out.println("�ļ���·������:" + filePath);
        }

        // ����ļ������ھʹ���
        File file = new File(filePath + "/" + fileName);
        if (!file.exists()) {
            System.out.println("�ļ������ڣ������ļ�:" + filePath + fileName);
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("�ļ��Ѵ��ڣ��ļ�Ϊ:" + filePath + fileName);
        }
    }


}
