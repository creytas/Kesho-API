const select_operations = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id LIMIT :limitParamStart,:limitParamEnd`;
const select_operations_by_affectation = `SELECT operation_matieres.id, date_operation,operation_matieres.matiere_id, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND matiere_premieres.affectation=:affectationParam ORDER BY date_operation DESC, type_operation LIMIT :limitParamStart,:limitParamEnd`;
const select_operations_by_id = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation as "type opération", qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND operation_matieres.id=:id`;
const select_affectation_operations_by_date = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND matiere_premieres.affectation=:affectationParam AND operation_matieres.date_operation BETWEEN :dateParamStart AND :dateParamEnd`;
const export_operations = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire" FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id ORDER BY date_operation DESC`;
const select_user_attendances = `SELECT DISTINCT users.id, users.id_user, users.prenom_user, users.nom_user, users.postnom_user, users.email, users.sexe_user, users.statut, users.is_admin, attendances.createdAt, attendances.attendance_state FROM attendances INNER JOIN users ON users.id=attendances.user_id WHERE attendances.createdAt IN (SELECT DISTINCT attendances.createdAt FROM attendances WHERE DATE_FORMAT(attendances.createdAt, "%Y-%m-%d")=DATE_FORMAT(CURRENT_DATE,"%Y-%m-%d")) GROUP BY users.id`;

const corn_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='maïs'`;
const corn_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='maïs'`;
const soy_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='soja'`;
const soy_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='soja'`;
const sugar_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='sucre'`;
const sugar_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='sucre'`;
const sorghum_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='sorgho'`;
const sorghum_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='sorgho'`;
const soap_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='savon'`;
const soap_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='savon'`;
const oil_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='huiles'`;
const oil_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='huiles'`;
const energy_briquette_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='briq. energ'`;
const energy_briquette_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='briq. energ'`;
const leaf_extract_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='ext. foliaires'`;
const leaf_extract_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='ext. foliaires'`;
const bread_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='pain/biscuit'`;
const bread_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='pain/biscuit'`;
const clothes_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='vêtement'`;
const clothes_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='vêtement'`;
const food_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='nourriture'`;
const food_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='nourriture'`;
const toy_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='jouets'`;
const toy_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='jouets'`;
const shoes_entrance = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='entrée' AND matiere_premieres.libelle_matiere='chaussures'`;
const shoes_exit = `SELECT matiere_premieres.libelle_matiere, SUM(qte_operation) AS 'total' FROM operation_matieres, matiere_premieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND type_operation='sortie' AND matiere_premieres.libelle_matiere='chaussures'`;

module.exports = {
  select_operations,
  select_operations_by_id,
  select_operations_by_affectation,
  select_affectation_operations_by_date,
  export_operations,
  select_user_attendances,
  corn_entrance,
  corn_exit,
  soap_entrance,
  soap_exit,
  sorghum_entrance,
  sorghum_exit,
  soy_entrance,
  soy_exit,
  sugar_entrance,
  sugar_exit,
  oil_entrance,
  oil_exit,
  energy_briquette_entrance,
  energy_briquette_exit,
  leaf_extract_entrance,
  leaf_extract_exit,
  bread_entrance,
  bread_exit,
  clothes_entrance,
  clothes_exit,
  food_entrance,
  food_exit,
  toy_entrance,
  toy_exit,
  shoes_entrance,
  shoes_exit,
};
