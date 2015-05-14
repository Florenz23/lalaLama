-- phpMyAdmin SQL Dump
-- version 4.2.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 14, 2015 at 05:23 PM
-- Server version: 5.6.21
-- PHP Version: 5.5.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
`user_id` int(11) unsigned NOT NULL,
  `user_name` varchar(32) DEFAULT NULL,
  `user_email` varchar(64) DEFAULT NULL,
  `password_hash` varchar(64) DEFAULT NULL,
  `password_salt` varchar(40) DEFAULT NULL,
  `user_root` int(10) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`user_id`, `user_name`, `user_email`, `password_hash`, `password_salt`, `user_root`) VALUES
(1, 'pedda23', '', '4bc52fce3322dc98061cf1a4fa717f58c5471d01f4b13f804ccaa769f31bf649', '5946bfa2d2acaf1a8ee4ddffcdf40bf241f452ff', NULL),
(37, 'Mustermann1234', NULL, NULL, NULL, 10),
(120, 'Admin', '', '04dc538a55e6b2638cd68c641c3b89ca77dd40f4e0142ee10961cb7f39066c14', 'c993c740b061e8a07cfdd76fa376747fe300db26', 1111),
(261, '2083261717', '1574532462@phpunit.test', '39ec78a084a64c672549c20a5bd34325f5ff09d0573fd08220cc3d6050eaf34b', 'd481184b56a5cf1445402bc3a9b0c1bba6a80ab2', 8857),
(267, '395042632', '1876646530@phpunit.test', '7108c39226e1860de84ad312cdaca91d28c85c1e94433e9bcc3daca76d0ea7a1', '5b21bd77ceab0c10a3188ced97f9685fca3a9b26', NULL),
(284, '1613355551', '1019370044@phpunit.test', '46b812684838df70e1f232c177b76e19ef340310ead82dfe1be80833189b1db0', 'a5d977f12021694767c6391f1f5f0f9fbd281a1a', NULL),
(292, 'Pedda', '', 'a4287060305f22cfbd62dc90c560e6e2ee0ad0e7bb95ff6ba88a221b5002786e', '1de7e6a12b663808b924e5e779cdf7f96141cb26', 9223),
(295, 'Meister', '', 'b43da349195e980e13b891217941098d2bd9d0b38a63bd29dab66b283a53f851', '11ad058111a7b8720281f91e068737d774504ca4', 9251),
(296, 'Florenz', '', '59d7c6217777be5f9cf3a599e5d73b0587179319c127f35a84235aef32a47d45', '50ae0325d8f6f0c305fc9a2b39a7c692a8d6d52e', 9257),
(302, 'Heinz', '', '352ba903494b952333cb015dae622edd1519da9a0356dc8c320b0e5bdbacbc06', '0a2da0f9daef9bf0a8bb51d9621f5d4ab126b894', 9309),
(314, 'Benutzername', '', '8da8959bb0822565c43c2f8623271341c829726ff49a2eb1b8064b4f127b2e19', 'd7cf2e6a1a3c141e07740f329d8235b38ca07aee', 9404);

-- --------------------------------------------------------

--
-- Table structure for table `answer_table`
--

CREATE TABLE IF NOT EXISTS `answer_table` (
`answer_id` int(11) unsigned NOT NULL,
  `voc_id` int(11) unsigned NOT NULL,
  `answer` text NOT NULL,
  `multi_choice` smallint(5) unsigned DEFAULT '0',
  `img_id` int(11) DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=1616 DEFAULT CHARSET=latin1 COMMENT='multiple_answers';

--
-- Dumping data for table `answer_table`
--

INSERT INTO `answer_table` (`answer_id`, `voc_id`, `answer`, `multi_choice`, `img_id`) VALUES
(1, 1, '', 0, 0),
(2, 2, '', 0, 0),
(7, 10, 'ich', 0, 0),
(8, 10, 'du', 0, 0),
(9, 10, 'er', 0, 0),
(10, 11, 'one', 0, 0),
(11, 12, 'two', 0, 0),
(12, 13, 'three', 0, 0),
(13, 14, 'four', 0, 0),
(14, 15, 'five', 0, 0),
(355, 290, 'moin2', 0, 0),
(357, 291, 'moin1 ', 0, 0),
(358, 291, 'moin1 ', 0, 0),
(544, 450, 'moin2', 0, 0),
(545, 451, 'moin1 ', 0, 0),
(546, 451, 'moin1 ', 0, 0),
(547, 452, 'moin2', 0, 0),
(548, 453, 'moin1 ', 0, 0),
(549, 453, 'moin1 ', 0, 0),
(560, 461, 'moin2', 0, 0),
(561, 462, 'moin1 ', 0, 0),
(562, 462, 'moin1 ', 0, 0),
(613, 498, 'moin2', 0, 0),
(614, 499, 'moin1 ', 0, 0),
(615, 499, 'moin1 ', 0, 0),
(616, 500, 'ich', 0, 0),
(617, 500, 'du', 0, 0),
(618, 500, 'er', 0, 0),
(619, 501, 'one', 0, 0),
(620, 502, 'two', 0, 0),
(621, 503, 'three', 0, 0),
(622, 504, 'four', 0, 0),
(623, 505, 'five', 0, 0),
(626, 507, 'ich', 0, 0),
(627, 507, 'du', 0, 0),
(628, 507, 'er', 0, 0),
(629, 508, 'one', 0, 0),
(630, 509, 'two', 0, 0),
(631, 510, 'three', 0, 0),
(632, 511, 'four', 0, 0),
(633, 512, 'five', 0, 0),
(636, 514, 'ich', 0, 0),
(637, 514, 'du', 0, 0),
(638, 514, 'er', 0, 0),
(639, 515, 'one', 0, 0),
(640, 516, 'two', 0, 0),
(641, 517, 'three', 0, 0),
(642, 518, 'four', 0, 0),
(643, 519, 'five', 0, 0),
(646, 521, 'ich', 0, 0),
(647, 521, 'du', 0, 0),
(648, 521, 'er', 0, 0),
(649, 522, 'one', 0, 0),
(650, 523, 'two', 0, 0),
(651, 524, 'three', 0, 0),
(652, 525, 'four', 0, 0),
(653, 526, 'five', 0, 0),
(656, 528, 'ich', 0, 0),
(657, 528, 'du', 0, 0),
(658, 528, 'er', 0, 0),
(659, 529, 'one', 0, 0),
(660, 530, 'two', 0, 0),
(661, 531, 'three', 0, 0),
(662, 532, 'four', 0, 0),
(663, 533, 'five', 0, 0),
(666, 535, 'ich', 0, 0),
(667, 535, 'du', 0, 0),
(668, 535, 'er', 0, 0),
(669, 536, 'one', 0, 0),
(670, 537, 'two', 0, 0),
(671, 538, 'three', 0, 0),
(672, 539, 'four', 0, 0),
(673, 540, 'five', 0, 0),
(676, 542, 'ich', 0, 0),
(677, 542, 'du', 0, 0),
(678, 542, 'er', 0, 0),
(679, 543, 'one', 0, 0),
(680, 544, 'two', 0, 0),
(681, 545, 'three', 0, 0),
(682, 546, 'four', 0, 0),
(683, 547, 'five', 0, 0),
(696, 556, 'ich', 0, 0),
(697, 556, 'du', 0, 0),
(698, 556, 'er', 0, 0),
(699, 557, 'one', 0, 0),
(700, 558, 'two', 0, 0),
(701, 559, 'three', 0, 0),
(702, 560, 'four', 0, 0),
(703, 561, 'five', 0, 0),
(706, 563, 'ich', 0, 0),
(707, 563, 'du', 0, 0),
(708, 563, 'er', 0, 0),
(709, 564, 'one', 0, 0),
(710, 565, 'two', 0, 0),
(711, 566, 'three', 0, 0),
(712, 567, 'four', 0, 0),
(713, 568, 'five', 0, 0),
(716, 570, 'ich', 0, 0),
(717, 570, 'du', 0, 0),
(718, 570, 'er', 0, 0),
(719, 571, 'one', 0, 0),
(720, 572, 'two', 0, 0),
(721, 573, 'three', 0, 0),
(722, 574, 'four', 0, 0),
(723, 575, 'five', 0, 0),
(726, 577, 'ich', 0, 0),
(727, 577, 'du', 0, 0),
(728, 577, 'er', 0, 0),
(729, 578, 'one', 0, 0),
(730, 579, 'two', 0, 0),
(731, 580, 'three', 0, 0),
(732, 581, 'four', 0, 0),
(733, 582, 'five', 0, 0),
(736, 584, 'ich', 0, 0),
(737, 584, 'du', 0, 0),
(738, 584, 'er', 0, 0),
(739, 585, 'one', 0, 0),
(740, 586, 'two', 0, 0),
(741, 587, 'three', 0, 0),
(742, 588, 'four', 0, 0),
(743, 589, 'five', 0, 0),
(766, 605, 'moin2', 0, 0),
(767, 606, 'moin1 ', 0, 0),
(768, 606, 'moin1 ', 0, 0),
(769, 607, 'moin2', 0, 0),
(770, 608, 'moin1 ', 0, 0),
(771, 608, 'moin1 ', 0, 0),
(772, 609, 'moin2', 0, 0),
(773, 610, 'moin1 ', 0, 0),
(774, 610, 'moin1 ', 0, 0),
(775, 611, 'moin2', 0, 0),
(776, 612, 'moin1 ', 0, 0),
(777, 612, 'moin1 ', 0, 0),
(778, 613, 'moin2', 0, 0),
(779, 614, 'moin1 ', 0, 0),
(780, 614, 'moin1 ', 0, 0),
(781, 615, 'moin2', 0, 0),
(782, 616, 'moin1 ', 0, 0),
(783, 616, 'moin1 ', 0, 0),
(784, 617, 'moin2', 0, 0),
(785, 618, 'moin1 ', 0, 0),
(786, 618, 'moin1 ', 0, 0),
(787, 619, 'moin2', 0, 0),
(788, 620, 'moin1 ', 0, 0),
(789, 620, 'moin1 ', 0, 0),
(790, 621, 'moin2', 0, 0),
(791, 622, 'moin1 ', 0, 0),
(792, 622, 'moin1 ', 0, 0),
(793, 623, 'moin2', 0, 0),
(794, 624, 'moin1 ', 0, 0),
(795, 624, 'moin1 ', 0, 0),
(796, 625, 'moin2', 0, 0),
(797, 626, 'moin1 ', 0, 0),
(798, 626, 'moin1 ', 0, 0),
(799, 627, 'ja', 0, 0),
(800, 628, 'ja', 0, 0),
(801, 629, 'moin', 0, 0),
(802, 630, 'jo', 0, 0),
(803, 631, 'moin', 0, 0),
(804, 632, 'jo', 0, 0),
(805, 633, 'moin', 0, 0),
(806, 634, 'jo', 0, 0),
(807, 635, 'moin', 0, 0),
(808, 636, 'moin ', 0, 0),
(809, 636, 'jo', 0, 0),
(810, 637, 'moin', 0, 0),
(811, 638, 'moin ', 0, 0),
(812, 638, 'jo', 0, 0),
(813, 639, 'moin', 0, 0),
(814, 640, 'moin ', 0, 0),
(815, 640, 'jo', 0, 0),
(816, 641, 'moin', 0, 0),
(817, 642, 'moin ', 0, 0),
(818, 642, 'jo', 0, 0),
(819, 643, 'moin', 0, 0),
(820, 644, 'moin ', 0, 0),
(821, 644, 'jo', 0, 0),
(822, 645, 'moin', 0, 0),
(823, 646, 'moin ', 0, 0),
(824, 646, 'jo', 0, 0),
(825, 647, 'moin', 0, 0),
(826, 648, 'moin ', 0, 0),
(827, 648, 'jo', 0, 0),
(828, 649, 'moin', 0, 0),
(829, 650, 'moin ', 0, 0),
(830, 650, 'jo', 0, 0),
(831, 651, 'moin', 0, 0),
(832, 652, 'moin ', 0, 0),
(833, 652, 'jo', 0, 0),
(834, 653, 'moin', 0, 0),
(835, 654, 'moin ', 0, 0),
(836, 654, 'jo', 0, 0),
(837, 655, 'moin', 0, 0),
(838, 656, 'moin ', 0, 0),
(839, 656, 'jo', 0, 0),
(840, 657, 'moin', 0, 0),
(841, 658, 'moin ', 0, 0),
(842, 658, 'jo', 0, 0),
(843, 659, 'moin', 0, 0),
(844, 660, 'moin ', 0, 0),
(845, 660, 'jo', 0, 0),
(846, 661, 'moin', 0, 0),
(847, 662, 'moin ', 0, 0),
(848, 662, 'jo', 0, 0),
(849, 663, 'moin', 0, 0),
(850, 664, 'moin ', 0, 0),
(851, 664, 'jo', 0, 0),
(852, 665, 'moin', 0, 0),
(853, 666, 'ich', 0, 0),
(854, 666, 'du', 0, 0),
(855, 666, 'er', 0, 0),
(856, 667, 'one', 0, 0),
(857, 668, 'two', 0, 0),
(858, 669, 'three', 0, 0),
(859, 670, 'four', 0, 0),
(860, 671, 'five', 0, 0),
(873, 680, 'moin ', 0, 0),
(874, 680, 'jo', 0, 0),
(875, 681, 'moin', 0, 0),
(876, 682, 'moin ', 0, 0),
(877, 682, 'jo', 0, 0),
(878, 683, 'moin', 0, 0),
(879, 684, 'moin ', 0, 0),
(880, 684, 'jo', 0, 0),
(881, 685, 'moin', 0, 0),
(882, 686, 'moin ', 0, 0),
(883, 686, 'jo', 0, 0),
(884, 687, 'moin', 0, 0),
(885, 688, 'moin ', 0, 0),
(886, 688, 'jo', 0, 0),
(887, 689, 'moin', 0, 0),
(888, 690, 'moin ', 0, 0),
(889, 690, 'jo', 0, 0),
(890, 691, 'moin', 0, 0),
(891, 692, 'moin ', 0, 0),
(892, 692, 'jo', 0, 0),
(893, 693, 'moin', 0, 0),
(894, 694, 'moin ', 0, 0),
(895, 694, 'jo', 0, 0),
(896, 695, 'moin', 0, 0),
(904, 696, 'one', 0, 0),
(905, 697, 'two', 0, 0),
(906, 698, 'three', 0, 0),
(907, 699, 'four', 0, 0),
(908, 700, 'five', 0, 0),
(1283, 962, 'jo ', 0, 0),
(1284, 962, 'haha ', 0, 0),
(1286, 963, 'jo', 0, 0),
(1287, 964, 'ha', 0, 0),
(1308, 979, 'jo', 0, 0),
(1309, 980, 'haha', 0, 0),
(1310, 981, 'jo ', 0, 0),
(1311, 981, 'haha ', 0, 0),
(1312, 982, 'jo', 0, 0),
(1313, 983, 'ha', 0, 0),
(1314, 984, 'ministre', 0, 0),
(1315, 985, 'ambassade', 0, 0),
(1316, 985, 'f', 0, 0),
(1317, 986, 'ambassadeur ', 0, 0),
(1318, 986, 'm', 0, 0),
(1319, 987, 'Ã‰tat', 0, 0),
(1320, 988, 'public', 0, 0),
(1321, 989, 'discours ', 0, 0),
(1322, 989, 'm', 0, 0),
(1323, 990, 'demande ', 0, 0),
(1324, 990, 'f', 0, 0),
(1325, 991, 'constitution ', 0, 0),
(1326, 991, 'f', 0, 0),
(1327, 992, 'loi ', 0, 0),
(1328, 992, 'f', 0, 0),
(1329, 993, 'budget ', 0, 0),
(1330, 993, 'm', 0, 0),
(1331, 994, 'pouvoir ', 0, 0),
(1332, 994, 'm', 0, 0),
(1333, 995, 'droit ', 0, 0),
(1334, 995, 'm', 0, 0),
(1335, 996, 'Ã©lÃ¨ve ', 0, 0),
(1336, 996, 'm/f', 0, 0),
(1337, 997, 'Ã©cole  ', 0, 0),
(1338, 997, 'f', 0, 0),
(1339, 998, 'doigt', 0, 0),
(1340, 998, 'm\n', 0, 0),
(1341, 999, 'cours ', 0, 0),
(1342, 999, 'm', 0, 0),
(1343, 1000, 'classe ', 0, 0),
(1344, 1000, 'f', 0, 0),
(1345, 1001, 'tableau ', 0, 0),
(1346, 1001, 'm', 0, 0),
(1347, 1002, 'interroger qn ', 0, 0),
(1348, 1002, 'sur qc', 0, 0),
(1350, 1003, 'interrogation ', 0, 0),
(1351, 1003, 'f', 0, 0),
(1352, 1004, 'devoir ', 0, 0),
(1353, 1004, 'm', 0, 0),
(1354, 1005, 'devoirs ', 0, 0),
(1355, 1005, 'm', 0, 0),
(1356, 1006, 'enseigner qc Ã  qn', 0, 0),
(1357, 1007, 'professeur', 0, 0),
(1358, 1008, 'Ã©ducation ', 0, 0),
(1359, 1008, 'f', 0, 0),
(1360, 1009, 'examen', 0, 0),
(1361, 1010, 'baccalarÃ©at ', 0, 0),
(1362, 1010, 'm', 0, 0),
(1363, 1011, 'lire qc', 0, 0),
(1364, 1012, 'premier cycle', 0, 0),
(1365, 1013, 'second cycle', 0, 0),
(1366, 1014, 'matiÃ¨re', 0, 0),
(1367, 1015, 'histoire ', 0, 0),
(1368, 1015, 'f', 0, 0),
(1369, 1016, 'dessin ', 0, 0),
(1370, 1016, 'm', 0, 0),
(1371, 1017, 'lycÃ©e', 0, 0),
(1372, 1018, 'apprendre qc', 0, 0),
(1373, 1019, 'langue ', 0, 0),
(1374, 1019, 'f', 0, 0),
(1375, 1020, 'Studium ', 0, 0),
(1376, 1020, 'f', 0, 0),
(1377, 1021, 'emploi du temps ', 0, 0),
(1378, 1021, 'm', 0, 0),
(1379, 1022, 'progrÃ¨s', 0, 0),
(1380, 1023, 'question ', 0, 0),
(1381, 1023, 'f', 0, 0),
(1382, 1024, 'moyenne ', 0, 0),
(1383, 1024, 'la', 0, 0),
(1384, 1025, 'copie ', 0, 0),
(1385, 1025, 'la', 0, 0),
(1386, 1026, 'copier qc', 0, 0),
(1387, 1027, 'cartable ', 0, 0),
(1388, 1027, 'm', 0, 0),
(1389, 1028, 'Vous avez compris?', 0, 0),
(1390, 1029, 'Vous me suivez?', 0, 0),
(1391, 1030, 'Qui est absent?', 0, 0),
(1392, 1031, 'livre ', 0, 0),
(1393, 1031, 'm', 0, 0),
(1396, 1036, 'C''est Ã  qui?', 0, 0),
(1397, 1037, 'Au suivant, s''il vous plaÃ®t!', 0, 0),
(1398, 1038, 'Vous avez fini?', 0, 0),
(1399, 1039, 'voyage ', 0, 0),
(1400, 1039, 'le', 0, 0),
(1401, 1040, 'vacances ', 0, 0),
(1402, 1040, 'f', 0, 0),
(1403, 1041, 'loisirs ', 0, 0),
(1404, 1041, 'm', 0, 0),
(1405, 1042, 'aventure ', 0, 0),
(1406, 1042, 'f', 0, 0),
(1407, 1043, 'bain ', 0, 0),
(1408, 1043, 'm', 0, 0),
(1409, 1044, 'se relaxer', 0, 0),
(1410, 1045, 'ennui ', 0, 0),
(1411, 1045, 'm', 0, 0),
(1412, 1046, 'sÃ©jour ', 0, 0),
(1413, 1046, 'm', 0, 0),
(1414, 1047, 'se reposer', 0, 0),
(1415, 1048, 'site', 0, 0),
(1416, 1048, 'm', 0, 0),
(1417, 1049, 'station ', 0, 0),
(1418, 1049, 'f', 0, 0),
(1419, 1050, 'montagne ', 0, 0),
(1420, 1050, 'f', 0, 0),
(1421, 1051, 'mer', 0, 0),
(1422, 1051, 'f', 0, 0),
(1423, 1052, 'visiter qc', 0, 0),
(1424, 1053, 'tente ', 0, 0),
(1425, 1053, 'f', 0, 0),
(1426, 1054, 'Ã©quipment ', 0, 0),
(1427, 1054, 'm', 0, 0),
(1428, 1055, 'hÃ©bÃ©rgement ', 0, 0),
(1429, 1055, 'm', 0, 0),
(1430, 1056, 'destination ', 0, 0),
(1431, 1056, 'f', 0, 0),
(1432, 1057, 'demander un  visa', 0, 0),
(1433, 1058, 'bagages ', 0, 0),
(1434, 1058, 'm', 0, 0),
(1435, 1059, 'valise ', 0, 0),
(1436, 1059, 'f', 0, 0),
(1437, 1060, 'sac Ã  dos', 0, 0),
(1438, 1061, 'parce que', 0, 0),
(1439, 1062, 'puisque', 0, 0),
(1440, 1063, 'comme', 0, 0),
(1441, 1064, 'car', 0, 0),
(1442, 1065, 'Ã  cause de qc/qn', 0, 0),
(1443, 1066, 'grÃ¢ce Ã  qc/qn', 0, 0),
(1444, 1067, 'wegen etw', 0, 0),
(1445, 1068, 'par consÃ©quent', 0, 0),
(1446, 1069, 'c''est-Ã -dire', 0, 0),
(1447, 1070, 'c''est pourquoi', 0, 0),
(1448, 1071, 'en d''autres termes', 0, 0),
(1449, 1072, 'c''est la raison pour laquelle', 0, 0),
(1450, 1073, 'en ce qui concerne qc/qn', 0, 0),
(1451, 1074, 'au fait', 0, 0),
(1452, 1075, 'en effet', 0, 0),
(1453, 1076, 'effectivement', 0, 0),
(1454, 1077, 'quoi qu''il en soit', 0, 0),
(1455, 1078, 'en rÃ©sumÃ©', 0, 0),
(1456, 1079, 'en un mot', 0, 0),
(1457, 1080, 'dans l''ensemble', 0, 0),
(1458, 1081, 'en somme', 0, 0),
(1459, 1082, 'en conclusion', 0, 0),
(1460, 1083, 'en fin de compte', 0, 0),
(1461, 1084, 'moyen de tranport', 0, 0),
(1462, 1085, 'camion', 0, 0),
(1463, 1086, 'route ', 0, 0),
(1464, 1086, 'f', 0, 0),
(1465, 1087, 'voiture ', 0, 0),
(1466, 1087, 'f', 0, 0),
(1467, 1088, 'vÃ©hicule', 0, 0),
(1468, 1089, 'volant ', 0, 0),
(1469, 1089, 'm', 0, 0),
(1470, 1090, 'feu ', 0, 0),
(1471, 1090, 'm', 0, 0),
(1472, 1091, 'bouchon ', 0, 0),
(1473, 1091, 'm', 0, 0),
(1474, 1092, 'chantier ', 0, 0),
(1475, 1092, 'm', 0, 0),
(1476, 1093, 'Ãªtre pris dans un embouteillage', 0, 0),
(1477, 1094, 'parking ', 0, 0),
(1478, 1094, 'm', 0, 0),
(1479, 1095, 'garer qc', 0, 0),
(1480, 1096, 'pÃ©age ', 0, 0),
(1481, 1096, 'm', 0, 0),
(1482, 1097, 'circulation ', 0, 0),
(1483, 1097, 'f', 0, 0),
(1484, 1098, 'dÃ©viation ', 0, 0),
(1485, 1098, 'f', 0, 0),
(1486, 1099, 'rond-point', 0, 0),
(1487, 1100, 'carrefour', 0, 0),
(1488, 1101, 'pont ', 0, 0),
(1489, 1101, 'm', 0, 0),
(1490, 1102, 'station-service ', 0, 0),
(1491, 1102, 'f', 0, 0),
(1492, 1103, 'tomber en panne', 0, 0),
(1493, 1104, 'roue ', 0, 0),
(1494, 1104, 'la', 0, 0),
(1495, 1105, 'pneu ', 0, 0),
(1496, 1105, 'm', 0, 0),
(1497, 1106, 'ceinture ', 0, 0),
(1498, 1106, 'f', 0, 0),
(1499, 1107, 'vitesse ', 0, 0),
(1500, 1107, 'f', 0, 0),
(1501, 1108, 'accident', 0, 0),
(1502, 1109, 'arrÃªt', 0, 0),
(1503, 1110, 'billet', 0, 0),
(1504, 1111, 'ponctualitÃ©', 0, 0),
(1505, 1112, 'heure ', 0, 0),
(1506, 1112, 'f', 0, 0),
(1507, 1113, 'retard ', 0, 0),
(1508, 1113, 'm', 0, 0),
(1509, 1114, 'train', 0, 0),
(1510, 1115, 'tram', 0, 0),
(1511, 1116, 'ligne ', 0, 0),
(1512, 1116, 'f', 0, 0),
(1523, 1124, 'yes', 0, 0),
(1524, 1125, 'no', 0, 0),
(1525, 1126, 'hello', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `child`
--

CREATE TABLE IF NOT EXISTS `child` (
`id` int(11) unsigned NOT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Persons`
--

CREATE TABLE IF NOT EXISTS `Persons` (
  `PersonID` int(11) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE IF NOT EXISTS `test_table` (
`id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tree`
--

CREATE TABLE IF NOT EXISTS `tree` (
`list_id` bigint(20) unsigned NOT NULL,
  `parent_id` bigint(20) unsigned NOT NULL,
  `position` bigint(20) unsigned NOT NULL,
  `left` bigint(20) unsigned NOT NULL,
  `right` bigint(20) unsigned NOT NULL,
  `level` bigint(20) unsigned NOT NULL,
  `title` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=1614 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tree`
--

INSERT INTO `tree` (`list_id`, `parent_id`, `position`, `left`, `right`, `level`, `title`, `type`, `user_id`) VALUES
(1526, 1524, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 12),
(1527, 1526, 0, 5, 8, 2, 'Startordner', 'folder', 12),
(1528, 1527, 0, 6, 7, 3, 'Startliste', 'list', 12),
(1574, 0, 1, 1, 10, 0, 'Root', '', 33),
(1575, 1574, 0, 2, 3, 1, 'MeineGruppen', 'drive', 33),
(1576, 1574, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 33),
(1577, 1576, 0, 5, 8, 2, 'Startordner', 'folder', 33),
(1578, 1577, 0, 6, 7, 3, 'Startliste', 'list', 33),
(1525, 1524, 0, 2, 3, 1, 'MeineGruppen', 'drive', 12),
(1524, 0, 1, 1, 10, 0, 'Root', '', 12),
(1523, 1522, 0, 6, 7, 3, 'Startliste', 'list', 11),
(1522, 1521, 0, 5, 8, 2, 'Startordner', 'folder', 11),
(1521, 1519, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 11),
(1520, 1519, 0, 2, 3, 1, 'MeineGruppen', 'drive', 11),
(1518, 1517, 0, 6, 7, 3, 'Startliste', 'list', 10),
(1519, 0, 1, 1, 10, 0, 'Root', '', 11),
(1517, 1516, 0, 5, 8, 2, 'Startordner', 'folder', 10),
(1516, 1514, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 10),
(1504, 0, 1, 1, 10, 0, 'Root', '', 8),
(1505, 1504, 0, 2, 3, 1, 'MeineGruppen', 'drive', 8),
(1506, 1504, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 8),
(1507, 1506, 0, 5, 8, 2, 'Startordner', 'folder', 8),
(1508, 1507, 0, 6, 7, 3, 'Startliste', 'list', 8),
(1509, 0, 1, 1, 10, 0, 'Root', '', 9),
(1510, 1509, 0, 2, 3, 1, 'MeineGruppen', 'drive', 9),
(1511, 1509, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 9),
(1512, 1511, 0, 5, 8, 2, 'Startordner', 'folder', 9),
(1513, 1512, 0, 6, 7, 3, 'Startliste', 'list', 9),
(1514, 0, 1, 1, 10, 0, 'Root', '', 10),
(1515, 1514, 0, 2, 3, 1, 'MeineGruppen', 'drive', 10),
(1503, 1502, 0, 6, 7, 3, 'Startliste', 'list', 7),
(1493, 1487, 0, 7, 8, 4, 'moinmoin', 'folder', 2),
(1499, 0, 1, 1, 10, 0, 'Root', '', 7),
(1500, 1499, 0, 2, 3, 1, 'MeineGruppen', 'drive', 7),
(1501, 1499, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 7),
(1502, 1501, 0, 5, 8, 2, 'Startordner', 'folder', 7),
(1496, 1494, 1, 4, 9, 1, 'MeinLamapacos', 'drive', 6),
(1498, 1497, 0, 6, 7, 3, 'Startliste', 'list', 6),
(1497, 1496, 0, 5, 8, 2, 'Startordner', 'folder', 6),
(1495, 1494, 0, 2, 3, 1, 'MeineGruppen', 'drive', 6),
(1494, 0, 1, 1, 10, 0, 'Root', '', 6),
(1487, 1486, 0, 6, 9, 3, 'Startliste', 'list', 2),
(1486, 1485, 0, 5, 10, 2, 'Startordner', 'folder', 2),
(1485, 1483, 1, 4, 11, 1, 'MeinLamapacos', 'drive', 2),
(1483, 0, 1, 1, 12, 0, 'Root', '', 2),
(1484, 1483, 0, 2, 3, 1, 'MeineGruppen', 'drive', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tree_data`
--

CREATE TABLE IF NOT EXISTS `tree_data` (
`id` int(10) unsigned NOT NULL,
  `nm` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9420 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tree_data`
--

INSERT INTO `tree_data` (`id`, `nm`, `type`) VALUES
(7, 'test_list', NULL),
(111, 'root', 'root'),
(112, 'PublicLists', 'public'),
(1111, 'root', 'root'),
(1112, 'MeineListen', 'mylama'),
(1113, 'Downloads', 'downloads'),
(1114, 'Startordner', 'folder'),
(8726, 'Startliste', 'list'),
(9235, 'root', 'root'),
(9236, 'MeineListen', 'mylama'),
(9237, 'Downloads', 'downloads'),
(9238, 'Startordner', 'folder'),
(9239, 'Startliste', 'list'),
(9251, 'root', 'root'),
(9252, 'MeineListen', 'mylama'),
(9253, 'Downloads', 'downloads'),
(9254, 'Startordner', 'folder'),
(9255, 'Startliste', 'list'),
(9256, 'moin', 'list'),
(9257, 'root', 'root'),
(9258, 'MeineListen', 'mylama'),
(9259, 'Downloads', 'downloads'),
(9260, 'Startordner', 'folder'),
(9261, 'Startliste', 'list'),
(9262, 'Französisch', 'folder'),
(9263, 'Sprachen', 'folder'),
(9264, 'Wortschatz Oberstufe', 'folder'),
(9266, 'politique', 'folder'),
(9267, 'Regierungsformen', 'list'),
(9268, 'société', 'folder'),
(9269, 'le système scolaire', 'list'),
(9271, 'vacances et tourism', 'list'),
(9273, 'communication', 'folder'),
(9274, 'expliquer', 'list'),
(9275, 'résumer', 'list'),
(9276, 'géographie', 'folder'),
(9277, 'infrastructure', 'list'),
(9278, 'root', 'root'),
(9279, 'MeineListen', 'mylama'),
(9280, 'Downloads', 'downloads'),
(9281, 'Startordner', 'folder'),
(9282, 'Startliste', 'list'),
(9294, 'root', 'root'),
(9295, 'MeineListen', 'mylama'),
(9296, 'Downloads', 'downloads'),
(9297, 'Startordner', 'folder'),
(9298, 'Startliste', 'list'),
(9299, 'root', 'root'),
(9300, 'MeineListen', 'mylama'),
(9301, 'Downloads', 'downloads'),
(9302, 'Startordner', 'folder'),
(9303, 'Startliste', 'list'),
(9304, 'root', 'root'),
(9305, 'MeineListen', 'mylama'),
(9306, 'Downloads', 'downloads'),
(9307, 'Startordner', 'folder'),
(9308, 'Startliste', 'list'),
(9309, 'root', 'root'),
(9310, 'MeineListen', 'mylama'),
(9311, 'Downloads', 'downloads'),
(9312, 'Startordner', 'folder'),
(9313, 'Startliste', 'list'),
(9402, 'jojo', 'folder'),
(9403, 'moin', 'folder'),
(9404, 'root', 'root'),
(9405, 'MeineListen', 'mylama'),
(9406, 'Downloads', 'downloads'),
(9407, 'Startordner', 'folder'),
(9408, 'Startliste', 'list');

-- --------------------------------------------------------

--
-- Table structure for table `tree_struct`
--

CREATE TABLE IF NOT EXISTS `tree_struct` (
`id` int(10) unsigned NOT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rgt` int(10) unsigned NOT NULL,
  `lvl` int(10) unsigned NOT NULL,
  `pid` int(10) unsigned DEFAULT NULL,
  `pos` int(10) unsigned NOT NULL,
  `root_id` int(10) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9420 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tree_struct`
--

INSERT INTO `tree_struct` (`id`, `lft`, `rgt`, `lvl`, `pid`, `pos`, `root_id`) VALUES
(7, 0, 0, 0, NULL, 0, NULL),
(111, 1, 30, 0, 0, 0, 111),
(112, 2, 29, 1, 111, 0, 111),
(1111, 1, 12, 0, 0, 0, 1111),
(1112, 2, 11, 1, 1111, 0, 1111),
(1113, 3, 4, 2, 1112, 0, 1111),
(1114, 5, 10, 2, 1112, 1, 1111),
(8726, 6, 7, 3, 1114, 0, 1111),
(9235, 1, 10, 0, 0, 0, 9235),
(9236, 2, 9, 1, 9235, 0, 9235),
(9237, 3, 4, 1, 9235, 1, 9235),
(9238, 5, 8, 1, 9235, 2, 9235),
(9239, 6, 7, 2, 9238, 0, 9235),
(9251, 1, 12, 0, 0, 0, 9251),
(9252, 2, 11, 1, 9251, 0, 9251),
(9253, 3, 6, 1, 9251, 1, 9251),
(9254, 7, 10, 1, 9251, 2, 9251),
(9255, 8, 9, 2, 9254, 0, 9251),
(9256, 4, 5, 2, 9253, 0, 9251),
(9257, 1, 12, 0, 0, 0, 9257),
(9258, 2, 11, 1, 9257, 0, 9257),
(9259, 3, 4, 1, 9257, 1, 9257),
(9260, 5, 10, 1, 9257, 2, 9257),
(9261, 6, 7, 2, 9260, 0, 9257),
(9262, 4, 27, 3, 9263, 0, 111),
(9263, 3, 28, 2, 112, 0, 111),
(9264, 5, 26, 4, 9262, 0, 111),
(9266, 6, 9, 5, 9264, 0, 111),
(9267, 7, 8, 6, 9266, 0, 111),
(9268, 10, 15, 5, 9264, 1, 111),
(9269, 11, 12, 6, 9268, 0, 111),
(9271, 13, 14, 6, 9268, 1, 111),
(9273, 16, 21, 5, 9264, 2, 111),
(9274, 17, 18, 6, 9273, 0, 111),
(9275, 19, 20, 6, 9273, 1, 111),
(9276, 22, 25, 5, 9264, 3, 111),
(9277, 23, 24, 6, 9276, 0, 111),
(9278, 1, 10, 0, 0, 0, 9278),
(9279, 2, 9, 1, 9278, 0, 9278),
(9280, 3, 4, 1, 9278, 1, 9278),
(9281, 5, 8, 1, 9278, 2, 9278),
(9282, 6, 7, 2, 9281, 0, 9278),
(9294, 1, 10, 0, 0, 0, 9294),
(9295, 2, 9, 1, 9294, 0, 9294),
(9296, 3, 4, 1, 9294, 1, 9294),
(9297, 5, 8, 1, 9294, 2, 9294),
(9298, 6, 7, 2, 9297, 0, 9294),
(9299, 1, 10, 0, 0, 0, 9299),
(9300, 2, 9, 1, 9299, 0, 9299),
(9301, 3, 4, 1, 9299, 1, 9299),
(9302, 5, 8, 1, 9299, 2, 9299),
(9303, 6, 7, 2, 9302, 0, 9299),
(9304, 1, 10, 0, 0, 0, 9304),
(9305, 2, 9, 1, 9304, 0, 9304),
(9306, 3, 4, 1, 9304, 1, 9304),
(9307, 5, 8, 1, 9304, 2, 9304),
(9308, 6, 7, 2, 9307, 0, 9304),
(9309, 1, 10, 0, 0, 0, 9309),
(9310, 2, 9, 1, 9309, 0, 9309),
(9311, 3, 4, 1, 9309, 1, 9309),
(9312, 5, 8, 1, 9309, 2, 9309),
(9313, 6, 7, 2, 9312, 0, 9309),
(9402, 8, 9, 3, 1114, 1, 1111),
(9403, 8, 9, 2, 9260, 1, 9257),
(9404, 1, 10, 0, 0, 0, 9404),
(9405, 2, 9, 1, 9404, 0, 9404),
(9406, 3, 4, 1, 9404, 1, 9404),
(9407, 5, 8, 1, 9404, 2, 9404),
(9408, 6, 7, 2, 9407, 0, 9404);

-- --------------------------------------------------------

--
-- Table structure for table `vocs`
--

CREATE TABLE IF NOT EXISTS `vocs` (
`voc_id` int(11) unsigned NOT NULL,
  `list_id` int(11) DEFAULT NULL,
  `question` text
) ENGINE=InnoDB AUTO_INCREMENT=1190 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vocs`
--

INSERT INTO `vocs` (`voc_id`, `list_id`, `question`) VALUES
(1, 1, NULL),
(2, NULL, NULL),
(10, 7, 'Pron'),
(11, 7, 'eins'),
(12, 7, 'zwei'),
(13, 7, 'drei'),
(14, 7, 'vier'),
(15, 7, 'fÃ¼nf'),
(290, 8049, 'moin2'),
(291, 8049, 'moin1'),
(450, 8375, 'moin2'),
(451, 8375, 'moin1'),
(452, 8376, 'moin2'),
(453, 8376, 'moin1'),
(461, 8390, 'moin2'),
(462, 8390, 'moin1'),
(498, 8456, 'moin2'),
(499, 8456, 'moin1'),
(500, 8463, 'Pron'),
(501, 8463, 'eins'),
(502, 8463, 'zwei'),
(503, 8463, 'drei'),
(504, 8463, 'vier'),
(505, 8463, 'fÃ¼nf'),
(507, 8476, 'Pron'),
(508, 8476, 'eins'),
(509, 8476, 'zwei'),
(510, 8476, 'drei'),
(511, 8476, 'vier'),
(512, 8476, 'fÃ¼nf'),
(514, 8489, 'Pron'),
(515, 8489, 'eins'),
(516, 8489, 'zwei'),
(517, 8489, 'drei'),
(518, 8489, 'vier'),
(519, 8489, 'fÃ¼nf'),
(521, 8502, 'Pron'),
(522, 8502, 'eins'),
(523, 8502, 'zwei'),
(524, 8502, 'drei'),
(525, 8502, 'vier'),
(526, 8502, 'fÃ¼nf'),
(528, 8515, 'Pron'),
(529, 8515, 'eins'),
(530, 8515, 'zwei'),
(531, 8515, 'drei'),
(532, 8515, 'vier'),
(533, 8515, 'fÃ¼nf'),
(535, 8528, 'Pron'),
(536, 8528, 'eins'),
(537, 8528, 'zwei'),
(538, 8528, 'drei'),
(539, 8528, 'vier'),
(540, 8528, 'fÃ¼nf'),
(542, 8541, 'Pron'),
(543, 8541, 'eins'),
(544, 8541, 'zwei'),
(545, 8541, 'drei'),
(546, 8541, 'vier'),
(547, 8541, 'fÃ¼nf'),
(556, 8567, 'Pron'),
(557, 8567, 'eins'),
(558, 8567, 'zwei'),
(559, 8567, 'drei'),
(560, 8567, 'vier'),
(561, 8567, 'fÃ¼nf'),
(563, 8580, 'Pron'),
(564, 8580, 'eins'),
(565, 8580, 'zwei'),
(566, 8580, 'drei'),
(567, 8580, 'vier'),
(568, 8580, 'fÃ¼nf'),
(570, 8593, 'Pron'),
(571, 8593, 'eins'),
(572, 8593, 'zwei'),
(573, 8593, 'drei'),
(574, 8593, 'vier'),
(575, 8593, 'fÃ¼nf'),
(577, 8606, 'Pron'),
(578, 8606, 'eins'),
(579, 8606, 'zwei'),
(580, 8606, 'drei'),
(581, 8606, 'vier'),
(582, 8606, 'fÃ¼nf'),
(584, 8619, 'Pron'),
(585, 8619, 'eins'),
(586, 8619, 'zwei'),
(587, 8619, 'drei'),
(588, 8619, 'vier'),
(589, 8619, 'fÃ¼nf'),
(605, 8652, 'moin2'),
(606, 8652, 'moin1'),
(607, 8653, 'moin2'),
(608, 8653, 'moin1'),
(609, 8654, 'moin2'),
(610, 8654, 'moin1'),
(611, 8655, 'moin2'),
(612, 8655, 'moin1'),
(613, 8656, 'moin2'),
(614, 8656, 'moin1'),
(615, 8657, 'moin2'),
(616, 8657, 'moin1'),
(617, 8658, 'moin2'),
(618, 8658, 'moin1'),
(619, 8659, 'moin2'),
(620, 8659, 'moin1'),
(621, 8660, 'moin2'),
(622, 8660, 'moin1'),
(623, 8661, 'moin2'),
(624, 8661, 'moin1'),
(625, 8662, 'moin2'),
(626, 8662, 'moin1'),
(627, 8663, 'ja'),
(628, 8664, 'ja'),
(629, 8665, 'moin'),
(630, 8668, 'jo'),
(631, 8668, 'moin'),
(632, 8669, 'jo'),
(633, 8669, 'moin'),
(634, 8670, 'jo'),
(635, 8670, 'moin'),
(636, 8675, 'moin'),
(637, 8675, 'moin'),
(638, 8676, 'moin'),
(639, 8676, 'moin'),
(640, 8677, 'moin'),
(641, 8677, 'moin'),
(642, 8678, 'moin'),
(643, 8678, 'moin'),
(644, 8679, 'moin'),
(645, 8679, 'moin'),
(646, 8680, 'moin'),
(647, 8680, 'moin'),
(648, 8681, 'moin'),
(649, 8681, 'moin'),
(650, 8682, 'moin'),
(651, 8682, 'moin'),
(652, 8683, 'moin'),
(653, 8683, 'moin'),
(654, 8684, 'moin'),
(655, 8684, 'moin'),
(656, 8685, 'moin'),
(657, 8685, 'moin'),
(658, 8686, 'moin'),
(659, 8686, 'moin'),
(660, 8687, 'moin'),
(661, 8687, 'moin'),
(662, 8688, 'moin'),
(663, 8688, 'moin'),
(664, 8689, 'moin'),
(665, 8689, 'moin'),
(666, 8696, 'Pron'),
(667, 8696, 'eins'),
(668, 8696, 'zwei'),
(669, 8696, 'drei'),
(670, 8696, 'vier'),
(671, 8696, 'fÃ¼nf'),
(680, 8716, 'moin'),
(681, 8716, 'moin'),
(682, 8717, 'moin'),
(683, 8717, 'moin'),
(684, 8718, 'moin'),
(685, 8718, 'moin'),
(686, 8719, 'moin'),
(687, 8719, 'moin'),
(688, 8720, 'moin'),
(689, 8720, 'moin'),
(690, 8721, 'moin'),
(691, 8721, 'moin'),
(692, 8722, 'moin'),
(693, 8722, 'moin'),
(694, 8723, 'moin'),
(695, 8723, 'moin'),
(696, 8733, 'eins'),
(697, 8733, 'zwei'),
(698, 8733, 'drei'),
(699, 8733, 'vier'),
(700, 8733, 'fÃ¼nf'),
(962, 8725, 'jo'),
(963, 8725, 'jo'),
(964, 8725, 'ha'),
(979, 9255, 'jo'),
(980, 9255, 'hah'),
(981, 9256, 'jo'),
(982, 9256, 'jo'),
(983, 9256, 'ha'),
(984, 9267, 'Innenminesterium'),
(985, 9267, 'Botschaft/er'),
(986, 9267, 'Botschafter'),
(987, 9267, 'Staat'),
(988, 9267, 'Ã¶ffentlich'),
(989, 9267, 'Rede'),
(990, 9267, 'Antrag'),
(991, 9267, 'Verfassung'),
(992, 9267, 'Gesetz'),
(993, 9267, 'Staatshaushalt'),
(994, 9267, 'Macht'),
(995, 9267, 'Recht'),
(996, 9269, 'SchÃ¼ler'),
(997, 9269, 'Schule'),
(998, 9269, 'Finger'),
(999, 9269, 'Unterrichtsstunde/kurs'),
(1000, 9269, 'Klassenzimmer'),
(1001, 9269, 'Tafel'),
(1002, 9269, 'jn Ã¼ber etw abfragen'),
(1003, 9269, 'Abfrage'),
(1004, 9269, 'Schulaufgabe'),
(1005, 9269, 'Hausaufgaben'),
(1006, 9269, 'jmd unterrichten'),
(1007, 9269, 'Lehrer'),
(1008, 9269, 'Erziehung'),
(1009, 9269, 'Klausur'),
(1010, 9269, 'Abitur'),
(1011, 9269, 'etc lesen'),
(1012, 9269, 'Grundstudium'),
(1013, 9269, 'Hauptstudium'),
(1014, 9269, 'Unterrichtsfach'),
(1015, 9269, 'Geschichte'),
(1016, 9269, 'Zeichnen/Zeichnung'),
(1017, 9269, 'Gymnasium'),
(1018, 9269, 'etw lernen'),
(1019, 9269, 'Sprache'),
(1020, 9269, 'Ã©tudes'),
(1021, 9269, 'Stundenplan'),
(1022, 9269, 'Fortschritt'),
(1023, 9269, 'Frage'),
(1024, 9269, 'Durchschnitt'),
(1025, 9269, 'Blatt'),
(1026, 9269, 'etw abschreiben'),
(1027, 9269, 'Schultasche'),
(1028, 9269, 'Habt ihr das verstanden?'),
(1029, 9269, 'Kommt ihr mit?'),
(1030, 9269, 'Wer fehlt?'),
(1031, 9269, 'Buch'),
(1036, 9269, 'Wer ist dran?'),
(1037, 9269, 'Der nÃ¤chste Bitte!'),
(1038, 9269, 'Seid ihr fertig?'),
(1039, 9271, 'Reise'),
(1040, 9271, 'Ferien'),
(1041, 9271, 'Freizeit'),
(1042, 9271, 'Abenteuer'),
(1043, 9271, 'Bad'),
(1044, 9271, 'entspannen'),
(1045, 9271, 'Langeweile'),
(1046, 9271, 'Aufenthalt'),
(1047, 9271, 'sich erholen'),
(1048, 9271, 'Landschaft/Gegend'),
(1049, 9271, 'Ferien/Urlaubsort'),
(1050, 9271, 'Gerg'),
(1051, 9271, 'Meer'),
(1052, 9271, 'etw besuchen'),
(1053, 9271, 'Zelt'),
(1054, 9271, 'AusrÃ¼stung'),
(1055, 9271, 'Unterkunft'),
(1056, 9271, 'Reiseziel'),
(1057, 9271, 'Visum beantragen '),
(1058, 9271, 'GepÃ¤ck'),
(1059, 9271, 'Koffer'),
(1060, 9271, 'Rucksack'),
(1061, 9274, 'weil'),
(1062, 9274, 'weil, da ja'),
(1063, 9274, 'da, weil'),
(1064, 9274, 'denn'),
(1065, 9274, 'wegen etw'),
(1066, 9274, 'wegen, dank etw'),
(1067, 9274, 'auf Grund einer Sache'),
(1068, 9274, 'folglich/infolgedessen'),
(1069, 9274, 'das heiÃŸt'),
(1070, 9274, 'daher/deshalb'),
(1071, 9274, 'in anderen Worten'),
(1072, 9274, 'daher,aus diesem Grund'),
(1073, 9275, 'was etw /jn betrifft'),
(1074, 9275, 'Ã¼brigens, was ich noch sagen wollte'),
(1075, 9275, 'in der Tat'),
(1076, 9275, 'nÃ¤mlich'),
(1077, 9275, 'wie dem auch sei'),
(1078, 9275, 'zusammenfassend'),
(1079, 9275, 'in einem Wort'),
(1080, 9275, 'insgesamt'),
(1081, 9275, 'alles in allem'),
(1082, 9275, 'abschlieÃŸend'),
(1083, 9275, 'zu guter Letzt'),
(1084, 9277, 'Verkehrsmittel'),
(1085, 9277, 'Lastwagen'),
(1086, 9277, 'StraÃŸe'),
(1087, 9277, 'Auto'),
(1088, 9277, 'Fahrzeug'),
(1089, 9277, 'Stuer'),
(1090, 9277, 'Ampel'),
(1091, 9277, 'Stau'),
(1092, 9277, 'Baustelle'),
(1093, 9277, 'im Stau stecken'),
(1094, 9277, 'Parkplatz'),
(1095, 9277, 'etw parken, abstellen'),
(1096, 9277, 'Autobahnmaut'),
(1097, 9277, 'Verkehr'),
(1098, 9277, 'Umleitung'),
(1099, 9277, 'Kreisverkehr'),
(1100, 9277, 'Kreuzung'),
(1101, 9277, 'BrÃ¼cke'),
(1102, 9277, 'Tankstelle'),
(1103, 9277, 'eine Panne haben'),
(1104, 9277, 'Rad'),
(1105, 9277, 'Reifen'),
(1106, 9277, 'Gurt'),
(1107, 9277, 'Geschwindigkeit'),
(1108, 9277, 'Unfall'),
(1109, 9277, 'Haltestell'),
(1110, 9277, 'Fahrkarte'),
(1111, 9277, 'PÃ¼nktlichkeit'),
(1112, 9277, 'Stunde'),
(1113, 9277, 'VerspÃ¤tung'),
(1114, 9277, 'Zug'),
(1115, 9277, 'StraÃŸenbahn'),
(1116, 9277, 'linie'),
(1124, 8726, 'ja'),
(1125, 8726, 'nein'),
(1126, 8726, 'hallo');

-- --------------------------------------------------------

--
-- Table structure for table `vocs_copy`
--

CREATE TABLE IF NOT EXISTS `vocs_copy` (
`voc_id` int(11) unsigned NOT NULL,
  `list_id` int(11) DEFAULT NULL,
  `question` text
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vocs_copy`
--

INSERT INTO `vocs_copy` (`voc_id`, `list_id`, `question`) VALUES
(1, 5, NULL),
(2, 5, NULL),
(3, 5, NULL),
(4, 5, NULL),
(5, 5, NULL),
(6, 5, NULL),
(7, 5, NULL),
(8, 5, NULL),
(9, 5, NULL),
(10, 5, NULL),
(11, 5, NULL),
(12, 5, NULL),
(13, 5, NULL),
(14, 5, NULL),
(15, 5, NULL),
(16, 5, NULL),
(17, 5, NULL),
(18, 5, NULL),
(19, 5, NULL),
(20, 5, NULL),
(21, 5, NULL),
(22, 5, NULL),
(23, 5, NULL),
(24, 5, NULL),
(28, 5, NULL),
(29, 5, NULL),
(30, 5, NULL),
(31, 5, NULL),
(32, 5, NULL),
(33, 5, NULL),
(34, 5, NULL),
(35, 5, NULL),
(36, 5, NULL),
(37, 5, NULL),
(38, 5, NULL),
(39, 5, NULL),
(40, 5, NULL),
(41, 5, NULL),
(42, 5, NULL),
(43, 5, NULL),
(44, 5, NULL),
(45, 5, NULL),
(46, 5, NULL),
(47, 5, NULL),
(48, 5, NULL),
(49, 5, NULL),
(50, 5, NULL),
(51, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `voc_user_data`
--

CREATE TABLE IF NOT EXISTS `voc_user_data` (
`answer_id` int(11) unsigned NOT NULL,
  `user_id` int(20) DEFAULT NULL,
  `right` int(11) unsigned DEFAULT '0',
  `wrong` int(11) unsigned DEFAULT '0',
  `rating` float DEFAULT '-1',
  `last_access` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COMMENT='multiple_answers';

--
-- Dumping data for table `voc_user_data`
--

INSERT INTO `voc_user_data` (`answer_id`, `user_id`, `right`, `wrong`, `rating`, `last_access`) VALUES
(1, 111, 1, 0, 0, '2015-05-14 12:40:51'),
(2, 111, 1, 0, 0, '2015-05-14 12:40:51'),
(7, 111, 0, 0, -1, '2015-05-14 12:40:51'),
(8, 111, 0, 0, -1, '2015-05-14 12:40:51'),
(9, 111, 0, 0, -1, '2015-05-14 12:40:51'),
(10, 111, 0, 0, -1, '2015-05-14 12:40:51'),
(11, 111, 0, 0, -1, '2015-05-14 12:40:51'),
(12, 111, 0, 0, -1, '2015-05-14 12:40:51'),
(13, 111, 0, 0, -1, '2015-05-14 12:40:51'),
(14, 111, 0, 0, 3, '2015-05-14 12:40:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
 ADD PRIMARY KEY (`user_id`), ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `answer_table`
--
ALTER TABLE `answer_table`
 ADD PRIMARY KEY (`answer_id`), ADD KEY `voc_id` (`voc_id`);

--
-- Indexes for table `child`
--
ALTER TABLE `child`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_table`
--
ALTER TABLE `test_table`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tree`
--
ALTER TABLE `tree`
 ADD PRIMARY KEY (`list_id`);

--
-- Indexes for table `tree_data`
--
ALTER TABLE `tree_data`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tree_struct`
--
ALTER TABLE `tree_struct`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vocs`
--
ALTER TABLE `vocs`
 ADD PRIMARY KEY (`voc_id`);

--
-- Indexes for table `vocs_copy`
--
ALTER TABLE `vocs_copy`
 ADD PRIMARY KEY (`voc_id`);

--
-- Indexes for table `voc_user_data`
--
ALTER TABLE `voc_user_data`
 ADD PRIMARY KEY (`answer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
MODIFY `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=316;
--
-- AUTO_INCREMENT for table `answer_table`
--
ALTER TABLE `answer_table`
MODIFY `answer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1616;
--
-- AUTO_INCREMENT for table `child`
--
ALTER TABLE `child`
MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `test_table`
--
ALTER TABLE `test_table`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tree`
--
ALTER TABLE `tree`
MODIFY `list_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1614;
--
-- AUTO_INCREMENT for table `tree_data`
--
ALTER TABLE `tree_data`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9420;
--
-- AUTO_INCREMENT for table `tree_struct`
--
ALTER TABLE `tree_struct`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9420;
--
-- AUTO_INCREMENT for table `vocs`
--
ALTER TABLE `vocs`
MODIFY `voc_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1190;
--
-- AUTO_INCREMENT for table `vocs_copy`
--
ALTER TABLE `vocs_copy`
MODIFY `voc_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `voc_user_data`
--
ALTER TABLE `voc_user_data`
MODIFY `answer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer_table`
--
ALTER TABLE `answer_table`
ADD CONSTRAINT `answer_table_ibfk_1` FOREIGN KEY (`voc_id`) REFERENCES `vocs` (`voc_id`) ON DELETE CASCADE;

--
-- Constraints for table `tree_data`
--
ALTER TABLE `tree_data`
ADD CONSTRAINT `tree_data_ibfk_1` FOREIGN KEY (`id`) REFERENCES `tree_struct` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `voc_user_data`
--
ALTER TABLE `voc_user_data`
ADD CONSTRAINT `voc_user_data_ibfk_1` FOREIGN KEY (`answer_id`) REFERENCES `answer_table` (`answer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
