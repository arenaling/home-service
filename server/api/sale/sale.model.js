'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Sale', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tanggal_penyerahan: DataTypes.DATE,
    so: DataTypes.STRING, //MYR, IJK, RKT, JGR, GBG, MGO, TDS, KBL, LKS
    sto: DataTypes.STRING, //MYR, IJK, RKT, JGR, GBG, MGO, TDS, KBL, LKS, WR, TPO, PRK, KND, KLA, BBE, KRP
    telepon: DataTypes.STRING,
    panggilan: DataTypes.STRING, // Tuan, Nyonya, Nona
    nama_pelanggan: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    email: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    profesi: DataTypes.STRING,
    identitas: DataTypes.STRING, //KTP, SIM, Passport
    nomor_identitas: DataTypes.STRING,
    kadaluarsa_identitas: DataTypes.STRING,
    nama_ibu_kandung: DataTypes.STRING,
    alamat_instalasi: DataTypes.TEXT,
    k_contact: DataTypes.STRING,
    paket: DataTypes.STRING,
    nama_sales: DataTypes.STRING,
    id_agencies: DataTypes.INTEGER,
    nama_agency: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
    hasil_verifikasi: DataTypes.STRING, //OK, NOT OK, RNA
    detail_hasil_verifikasi: DataTypes.STRING,
    verificator: DataTypes.INTEGER,
    nama_verificator: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    nomor_referensi: DataTypes.STRING,
    odp_referensi: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    manja: DataTypes.STRING,
    inputer: DataTypes.INTEGER,
    nama_inputer: DataTypes.STRING,
    nomor_sc: DataTypes.STRING,
    nomor_pots: DataTypes.STRING,
    nomor_internet: DataTypes.STRING,
    keterangan_inputer: DataTypes.TEXT,
    file_ktp: DataTypes.TEXT,
    status: DataTypes.STRING,
    sedang_diambil: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      nama_panggilan: function() {
        return this.panggilan + " " + this.nama_pelanggan;
      }
    },
  });
}
